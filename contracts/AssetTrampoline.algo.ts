import { Contract } from '@algorandfoundation/tealscript';
import GetApplicationByID from 'algosdk/dist/types/client/v2/algod/getApplicationByID';

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

  executeOrder(
    parentAppCall: AppCallTxn,
    buyTransfer: AssetTransferTxn,
    sellAsset: Asset,
    buyAsset: Asset,
    creatorAddr: Account
  ): Address[] {
    // Update method args to take an AppCall as first transaction.
    // Check that the appCall is going the same as the globals.creatorAddress
    assert(parentAppCall.applicationID.address === this.app.creator);
    assert(buyTransfer.xferAsset === this.buyAsset.value);
    assert(buyTransfer.xferAsset === buyAsset);
    assert(this.sellAsset.value === sellAsset);
    assert(this.creator.value === creatorAddr);
    assert(buyTransfer.sender.isOptedInToAsset(sellAsset));
    const returnAmount = this.calculateReturnAmount(buyTransfer.assetAmount);
    assert(this.app.address.assetBalance(this.sellAsset.value) >= returnAmount);
    assert(this.creator.value.isOptedInToAsset(this.buyAsset.value));
    sendAssetTransfer({
      xferAsset: buyTransfer.xferAsset,
      assetAmount: buyTransfer.assetAmount,
      assetReceiver: this.creator.value,
    });

    sendAssetTransfer({ xferAsset: sellAsset, assetAmount: returnAmount, assetReceiver: buyTransfer.sender });

    return [parentAppCall.applicationID.address, this.app.creator, this.app.address];
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
  ): Application {
    // Verify input Transactions
    verifyPayTxn(payTxn, {
      receiver: globals.currentApplicationAddress,
      amount: 1_000_001,
    });

    assert(globals.currentApplicationAddress.isOptedInToAsset(assetTransfer.xferAsset));
    verifyAssetTransferTxn(assetTransfer, {
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

    return childAppId;
  }

  executeOrder(orderApp: Application, sellAsset: Asset, buyAsset: Asset): Address[] {
    assert(orderApp.creator === this.app.address);
    assert(orderApp.address.assetBalance(sellAsset) > 0);
    // assert(this.app.address.assetBalance(buyAsset) >= 0);
    return [orderApp.address, orderApp.creator, this.app.address];
  }
}
