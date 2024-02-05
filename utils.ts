import { AlgoAmount } from '@algorandfoundation/algokit-utils/types/amount';
import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';

// import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';

interface CreateAndSendAsset {
  creator: algosdk.Account;
  recievers: algosdk.Account[];
  total?: bigint;
  amountToSend?: bigint;
  decimals: number;
  algod: algosdk.Algodv2;
}

interface CreateAsset {
  creator: algosdk.Account;
  total?: bigint;
  decimals?: number;
  algod: algosdk.Algodv2;
}

export async function optIn(account: algosdk.Account, idx: bigint | number, algod: algosdk.Algodv2): Promise<void> {
  await algokit.sendTransaction(
    {
      transaction: algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        suggestedParams: await algod.getTransactionParams().do(),
        from: account.addr,
        amount: 0,
        to: account.addr,
        assetIndex: Number(idx),
      }),
      from: account,
    },

    algod
  );
}

export async function createAsset({
  creator,
  total = BigInt(10000),
  decimals = 2,
  algod,
}: CreateAsset): Promise<number | bigint> {
  const asaCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    suggestedParams: await algod.getTransactionParams().do(),
    from: creator.addr,
    total,
    decimals,
    defaultFrozen: false,
  });

  const { confirmation } = await algokit.sendTransaction({ transaction: asaCreateTxn, from: creator }, algod);

  const asaIdx = confirmation!.assetIndex!;
  return asaIdx;
}

export async function createAndSendAsset({
  creator,
  recievers,
  total = BigInt(10000),
  amountToSend = BigInt(10),
  decimals = 2,
  algod,
}: CreateAndSendAsset): Promise<number | bigint> {
  const asaCreateTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
    suggestedParams: await algod.getTransactionParams().do(),
    from: creator.addr,
    total,
    decimals,
    defaultFrozen: false,
  });

  const { confirmation } = await algokit.sendTransaction({ transaction: asaCreateTxn, from: creator }, algod);

  const asaIdx = confirmation!.assetIndex!;

  const params = await algod.getTransactionParams().do();

  await Promise.all(
    recievers.map((reciever) => {
      return algokit.sendGroupOfTransactions(
        {
          transactions: [
            {
              transaction: algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                suggestedParams: params,
                from: reciever.addr,
                to: reciever.addr,
                amount: 0,
                assetIndex: Number(asaIdx),
              }),
              signer: reciever,
            },
            {
              transaction: algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                suggestedParams: params,
                from: creator.addr,
                to: reciever.addr,
                amount: amountToSend,
                assetIndex: Number(asaIdx),
              }),
              signer: creator,
            },
          ],
        },
        algod
      );
    })
  );

  return asaIdx;
}
