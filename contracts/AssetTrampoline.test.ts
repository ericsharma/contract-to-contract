import { describe, test, beforeAll, beforeEach } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';
import { AssetTrampolineClient } from './clients/AssetTrampolineClient';

describe('Asset Trampoline', () => {
  const fixture = algorandFixture();

  let appClient: AssetTrampolineClient;

  let asa: bigint;

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
    const asaCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      suggestedParams: await algod.getTransactionParams().do(),
      from: testAccount.addr,
      total: 10000,
      decimals: 0,
      defaultFrozen: false,
    });

    const { confirmation } = await algokit.sendTransaction({ transaction: asaCreateTxn, from: testAccount }, algod);

    asa = BigInt(confirmation!.assetIndex!);

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
      amount: 200_000,
      to: appAddress,
    });

    const assetTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: alice.addr,
      to: appAddress,
      assetIndex: Number(asa),
      amount: 10,
      suggestedParams: await algod.getTransactionParams().do(),
    });

    console.info(`*** Parent App ID**** ${appAddress}`);
    await appClient
      .compose()
      .optInToAsa([mbrOptInTxn, Number(asa)], { sendParams: { fee: algokit.microAlgos(3_000) } })
      .sendAssetToChildContract([childMbrOptInTxn, assetTransferTxn], {
        sendParams: { fee: algokit.microAlgos(6_000) },
      })
      .execute();
  });
});
