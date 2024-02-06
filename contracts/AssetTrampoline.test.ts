import { describe, test, beforeAll, beforeEach } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { AssetTrampolineClient } from './clients/AssetTrampolineClient';
import { ChildContractClient } from './clients/ChildContractClient';
import { createAndSendAsset, createAsset, optIn } from '../utils';

describe('Asset Trampoline', () => {
  const fixture = algorandFixture();

  let orderbookAppClient: AssetTrampolineClient;

  let sellIdx: bigint | number;
  let buyIdx: bigint | number;

  let alice: algosdk.Account;
  let bob: algosdk.Account;
  let charlie: algosdk.Account;
  let orderAppId: bigint | number;

  beforeEach(fixture.beforeEach);
  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount, generateAccount } = fixture.context;

    alice = testAccount;

    bob = await generateAccount({ initialFunds: new AlgoAmount({ algos: 10_000_000 }) });
    charlie = await generateAccount({ initialFunds: new AlgoAmount({ algos: 10_000_000 }) });

    orderbookAppClient = new AssetTrampolineClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await orderbookAppClient.create.createApplication({});

    sellIdx = await createAndSendAsset({
      creator: testAccount,
      recievers: [bob],
      total: BigInt(100_000),
      amountToSend: BigInt(10),
      decimals: 2,
      algod,
    });

    // buyIdx = await createAsset({ creator: testAccount, algod });
    buyIdx = await createAndSendAsset({
      creator: testAccount,
      recievers: [charlie],
      total: BigInt(10_000),
      amountToSend: BigInt(6),
      decimals: 3,
      algod,
    });

    await optIn(bob, buyIdx, algod);
    await optIn(charlie, sellIdx, algod);

    await orderbookAppClient.appClient.fundAppAccount(algokit.microAlgos(1_000_000));
  });

  test('open order', async () => {
    const { algod } = fixture.context;
    const { appAddress } = await orderbookAppClient.appClient.getAppReference();
    const mbrOptInTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: await algod.getTransactionParams().do(),
      from: bob.addr,
      amount: 100_000,
      to: appAddress,
    });

    const childMbrOptInTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: { ...(await algod.getTransactionParams().do()) },
      from: bob.addr,
      amount: 1_000_001,
      to: appAddress,
    });

    const assetTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: bob.addr,
      to: appAddress,
      assetIndex: Number(sellIdx),
      amount: 10,
      suggestedParams: await algod.getTransactionParams().do(),
    });

    console.info(`*** Parent App ID**** ${appAddress}`);
    const { returns } = await orderbookAppClient
      .compose()
      .optInToAsa([mbrOptInTxn, Number(sellIdx)], { sender: bob, sendParams: { fee: algokit.microAlgos(3_000) } })
      // .optInToAsa([mbrOptInTxn, Number(buyIdx)], { sendParams: { fee: algokit.microAlgos(3_000) } })

      .openOrder([childMbrOptInTxn, assetTransferTxn, Number(buyIdx), 10, 20], {
        sender: bob,
        sendParams: { fee: algokit.microAlgos(6_000) },
      })
      .execute();

    const placeHolder: bigint | number = returns[1];
    orderAppId = placeHolder;

    console.info(returns);

    console.info(orderAppId);
    console.info('###');
  });

  test('executeOrder (parentMethod)', async () => {
    const { returns: parentReturns } = await orderbookAppClient
      .compose()
      .executeOrder([Number(orderAppId), sellIdx, buyIdx], {
        sender: charlie,
        sendParams: { fee: algokit.microAlgos(3_000) },
      })
      .execute();

    console.info(`^%^%^%^%^ parent return ${parentReturns}`);
  });

  test('executeOrder', async () => {
    const { algod } = fixture.context;
    const { appAddress: orderbookAppAddress } = await orderbookAppClient.appClient.getAppReference();

    const orderAppClient = new ChildContractClient({ resolveBy: 'id', id: orderAppId }, algod);

    const appCallTxn = orderbookAppClient.executeOrder([Number(orderAppId), sellIdx, buyIdx], {
      sender: charlie,
      sendParams: { fee: algokit.microAlgos(3_000) },
    });

    const { appAddress: orderAppAddress } = await orderAppClient.appClient.getAppReference();

    const assetTransferBuyTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: charlie.addr,
      to: orderAppAddress,
      assetIndex: Number(buyIdx),
      amount: 6,
      suggestedParams: await algod.getTransactionParams().do(),
    });
    const { returns } = await orderAppClient
      .compose()
      .triggerOptIn([Number(buyIdx)], { sender: charlie, sendParams: { fee: algokit.microAlgos(3_000) } })
      .executeOrder([appCallTxn, assetTransferBuyTxn, sellIdx, buyIdx, bob.addr], {
        sender: charlie,
        sendParams: { fee: algokit.microAlgos(6_000) },
      })
      .execute();

    console.info(`#### ${returns}`);

    console.info(`
      orderbook: ${orderbookAppAddress}
      order: ${orderAppAddress}
      bob (seller): ${bob.addr}
      charlie (buyer): ${charlie.addr}
      buy IDX : ${buyIdx}
      sell IDX: ${sellIdx}
      sellQuant: 10,
      buyQuant: 20,
      charlie sends: 6
      expect ${charlie.addr} to have 3 of ${sellIdx}
      expect ${bob.addr} to have 6 if ${buyIdx}
      `);
  });
});
