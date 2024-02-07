import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class ChildContract extends Contract {
  Asset = GlobalStateKey<Asset>();

  Creator = GlobalStateKey<Account>();

  // @allow.create()
  // new(asset: Asset): Address {
  //   this.Asset.value = asset;
  //   return this.app.address;
  // }

  // createApplication(asset: Asset): void {
  //   this.Asset.value = asset;
  //   // return this.app.address;
  // }

  triggerOptIn(payTxn: PayTxn, asset: Asset): void {
    // this.Asset.value = asset;
    // verifyPayTxn(payTxn, {
    //   receiver: this.app.address,
    // });

    assert(payTxn.receiver === this.app.address);
    sendAssetTransfer({
      // xferAsset: this.Asset.value,
      xferAsset: asset,
      assetAmount: 0,
      sender: this.app.address,
      assetReceiver: this.app.address,
    });
  }

  transferAsset(assetTransfer: AssetTransferTxn, sender: Account): void {
    verifyAssetTransferTxn(assetTransfer, {
      sender: globals.creatorAddress,
      assetReceiver: globals.currentApplicationAddress,
      // xferAsset: this.Asset.value,
    });

    // this.Creator.value = sender;
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
      // methodArgs: [assetTransfer.xferAsset],
      // fee: 3000,
    });

    const childAppId = this.itxn.createdApplicationID;
    sendPayment({
      receiver: childAppId.address,
      amount: 300_000,
    });

    sendMethodCall<[InnerPayment, Asset], void>({
      name: 'triggerOptIn',
      applicationID: childAppId,

      methodArgs: [{ amount: 200_000, receiver: childAppId.address }, assetTransfer.xferAsset],
    });

    // sendMethodCall<[InnerAssetTransfer, Address], void>({
    //   name: 'transferAsset',
    //   applicationID: childAppId,
    //   methodArgs: [
    //     {
    //       xferAsset: assetTransfer.xferAsset,
    //       assetReceiver: childAppId.address,
    //       assetAmount: assetTransfer.assetAmount,
    //     },
    //     globals.creatorAddress,
    //   ],
    // });
  }
}
