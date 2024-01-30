import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class ChildContract extends Contract {
  heldAsset = GlobalStateKey<Asset>();

  creator = GlobalStateKey<Account>();

  triggerOptIn(asset: Asset): void {
    // this.heldAsset.value = asset as Asset;
    sendAssetTransfer({
      // xferAsset: this.Asset.value,
      xferAsset: asset,
      assetAmount: 0,
      sender: this.app.address,
      assetReceiver: this.app.address,
    });
  }

  setCreator(sender: Account): void {
    this.creator.value = sender;
  }
}
// eslint-disable-next-line no-unused-vars
class AssetTrampoline extends Contract {
  optInToAsa(payTxn: PayTxn, asset: Asset): void {
    verifyPayTxn(payTxn, {
      receiver: globals.currentApplicationAddress,
    });
    sendAssetTransfer({
      xferAsset: asset,
      assetAmount: 0,
      sender: globals.currentApplicationAddress,
      assetReceiver: globals.currentApplicationAddress,
    });
  }

  sendAssetToChildContract(payTxn: PayTxn, assetTransfer: AssetTransferTxn): void {
    // Verify input Transactions
    verifyPayTxn(payTxn, {
      receiver: globals.currentApplicationAddress,
      sender: globals.creatorAddress,
    });

    assert(globals.currentApplicationAddress.isOptedInToAsset(assetTransfer.xferAsset));
    verifyAssetTransferTxn(assetTransfer, {
      sender: globals.creatorAddress,
      assetReceiver: globals.currentApplicationAddress,
    });

    // Create child contract
    sendMethodCall<[], void>({
      name: 'createApplication',
      clearStateProgram: ChildContract.clearProgram(),
      approvalProgram: ChildContract.approvalProgram(),
    });

    const childAppId = this.itxn.createdApplicationID;
    sendPayment({
      receiver: childAppId.address,
      amount: 500_000,
    });

    sendMethodCall<[Asset], void>({
      name: 'triggerOptIn',
      applicationID: childAppId,
      methodArgs: [assetTransfer.xferAsset],
    });
    sendAssetTransfer({
      xferAsset: assetTransfer.xferAsset,
      assetReceiver: childAppId.address,
      assetAmount: assetTransfer.assetAmount,
    });
  }
}
