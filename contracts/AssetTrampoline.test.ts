import { describe, test, beforeAll, beforeEach } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import { AssetTrampolineClient } from './clients/AssetTrampolineClient';
import { createAndSendAsset, createAsset, optIn } from '../utils';

describe('Asset Trampoline', () => {
  const fixture = algorandFixture();

  let appClient: AssetTrampolineClient;

  let sellIdx: bigint | number;
  let buyIdx: bigint | number;

  let alice: algosdk.Account;
  let bob: algosdk.Account;
  let orderAddr: string;

  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount, generateAccount } = fixture.context;

    alice = testAccount;

    bob = await generateAccount({ initialFunds: new AlgoAmount({ algos: 10_000_000 }) });

    appClient = new AssetTrampolineClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});

    sellIdx = await createAndSendAsset({
      creator: testAccount,
      recievers: [bob],
      total: BigInt(100000),
      amountToSend: BigInt(10),
      decimals: 2,
      algod,
    });

    buyIdx = await createAsset({ creator: testAccount, algod });

    await optIn(bob, buyIdx, algod);

    await appClient.appClient.fundAppAccount(algokit.microAlgos(1_000_000));
  });

  test('optInToAsa Method', async () => {
    const { algod } = fixture.context;
    const { appAddress } = await appClient.appClient.getAppReference();
    const mbrOptInTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: await algod.getTransactionParams().do(),
      from: alice.addr,
      amount: 100_000,
      to: appAddress,
    });

    const childMbrOptInTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      suggestedParams: { ...(await algod.getTransactionParams().do()) },
      from: alice.addr,
      amount: 1_000_001,
      to: appAddress,
    });

    const assetTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: alice.addr,
      to: appAddress,
      assetIndex: Number(sellIdx),
      amount: 10,
      suggestedParams: await algod.getTransactionParams().do(),
    });

    console.info(`*** Parent App ID**** ${appAddress}`);
    const { returns } = await appClient
      .compose()
      .optInToAsa([mbrOptInTxn, Number(sellIdx)], { sendParams: { fee: algokit.microAlgos(3_000) } })
      // .optInToAsa([mbrOptInTxn, Number(buyIdx)], { sendParams: { fee: algokit.microAlgos(3_000) } })

      .openOrder([childMbrOptInTxn, assetTransferTxn, Number(buyIdx), 10, 20], {
        sendParams: { fee: algokit.microAlgos(6_000) },
      })
      .execute();

    const placeHolder: string = returns[1];
    orderAddr = placeHolder;

    console.info(orderAddr);
  });

  test('executeOrder', async () => {
    const { algod } = fixture.context;
    const { appAddress } = await appClient.appClient.getAppReference();
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

    const assetTransferBuyTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: bob.addr,
      to: appAddress,
      assetIndex: Number(buyIdx),
      amount: 10,
      suggestedParams: await algod.getTransactionParams().do(),
    });

    // Write the method to execute on an order
  });
});
