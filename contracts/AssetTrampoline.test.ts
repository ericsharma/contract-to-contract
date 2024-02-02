import { describe, test, beforeAll, beforeEach } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { AssetTrampolineClient } from './clients/AssetTrampolineClient';

describe('Asset Trampoline', () => {
  const fixture = algorandFixture();

  let appClient: AssetTrampolineClient;

  let sellIdx: bigint;
  let buyIdx: bigint;

  let alice: algosdk.Account;

  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    alice = testAccount;

    appClient = new AssetTrampolineClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});

    // Create an ASA to use in our tests
    const sellAsaCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams: await algod.getTransactionParams().do(),
      from: testAccount.addr,
      total: 10000,
      decimals: 0,
      defaultFrozen: false,
    });

    const { confirmation: sellConfirmation } = await algokit.sendTransaction(
      { transaction: sellAsaCreateTxn, from: testAccount },
      algod
    );

    sellIdx = BigInt(sellConfirmation!.assetIndex!);
    const buyAsaCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams: await algod.getTransactionParams().do(),
      from: testAccount.addr,
      total: 10000,
      decimals: 0,
      defaultFrozen: false,
    });

    const { confirmation: buyConfirmation } = await algokit.sendTransaction(
      { transaction: buyAsaCreateTxn, from: testAccount },
      algod
    );

    buyIdx = BigInt(buyConfirmation!.assetIndex!);

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
    const assetTransferBuyTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: alice.addr,
      to: appAddress,
      assetIndex: Number(buyIdx),
      amount: 10,
      suggestedParams: await algod.getTransactionParams().do(),
    });

    console.info(`*** Parent App ID**** ${appAddress}`);
    await appClient
      .compose()
      .optInToAsa([mbrOptInTxn, Number(sellIdx)], { sendParams: { fee: algokit.microAlgos(3_000) } })
      // .optInToAsa([mbrOptInTxn, Number(buyIdx)], { sendParams: { fee: algokit.microAlgos(3_000) } })

      .sendAssetToChildContract([childMbrOptInTxn, assetTransferTxn, Number(buyIdx), 10, 20], {
        sendParams: { fee: algokit.microAlgos(6_000) },
      })
      .execute();
  });
});
