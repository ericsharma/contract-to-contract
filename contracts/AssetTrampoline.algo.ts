import { Contract } from '@algorandfoundation/tealscript';

// eslint-disable-next-line no-unused-vars
class ChildContract extends Contract {
  sellAsset = GlobalStateKey<Asset>();

  buyAsset = GlobalStateKey<Asset>();

  buyQuant = GlobalStateKey<uint64>();

  sellQuant = GlobalStateKey<uint64>();

  creator = GlobalStateKey<Account>();

  private calculateReturnAmount(buyAmt: uint64): uint64 {
    return wideRatio([buyAmt, this.sellQuant.value], [this.buyQuant.value]);
  }

  createApplication(sellAsset: Asset, buyAsset: Asset, sellQuant: uint64, buyQuant: uint64, creator: Account): Address {
    this.sellAsset.value = sellAsset;
    this.buyAsset.value = buyAsset;
    this.sellQuant.value = sellQuant;
    this.buyQuant.value = buyQuant;
    this.creator.value = creator;

    return this.app.address;
  }

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

  openOrder(
    payTxn: PayTxn,
    assetTransfer: AssetTransferTxn,
    buyAsset: Asset,
    sellQuant: uint64,
    buyQuant: uint64
  ): Address {
    // Verify input Transactions
    verifyPayTxn(payTxn, {
      receiver: globals.currentApplicationAddress,
      sender: globals.creatorAddress,
      amount: 1_000_001,
    });

    assert(globals.currentApplicationAddress.isOptedInToAsset(assetTransfer.xferAsset));
    verifyAssetTransferTxn(assetTransfer, {
      sender: globals.creatorAddress,
      assetReceiver: globals.currentApplicationAddress,
    });

    // Create child contract
    const orderAddress = sendMethodCall<[Asset, Asset, uint64, uint64, Account], Address>({
      name: 'createApplication',
      clearStateProgram: ChildContract.clearProgram(),
      approvalProgram: ChildContract.approvalProgram(),
      methodArgs: [assetTransfer.xferAsset, buyAsset, sellQuant, buyQuant, assetTransfer.sender],
      globalNumByteSlice: ChildContract.schema.global.numByteSlice,
      globalNumUint: ChildContract.schema.global.numUint,
      localNumByteSlice: ChildContract.schema.local.numByteSlice,
      localNumUint: ChildContract.schema.local.numUint,
    });

    const childAppId = this.itxn.createdApplicationID;
    sendPayment({
      receiver: childAppId.address,
      amount: payTxn.amount,
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

    return orderAddress;
  }
}
