import * as StellarSdk from "@stellar/stellar-sdk";
import { rpc, stellarConfig } from "./stellar";

export type LeaseDraft = {
  tenant: string;
  landlord: string;
  token: string;
  rentAmount: string;
  depositAmount: string;
  months: number;
  firstReleaseLedger: number;
  releaseIntervalLedgers: number;
  depositUnlockLedger: number;
  arbitrators: string[];
};

export async function buildCreateLeaseXdr(source: string, contractId: string, draft: LeaseDraft) {
  const account = await rpc.getAccount(source);
  const contract = new StellarSdk.Contract(contractId);

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: stellarConfig.networkPassphrase,
  })
    .addOperation(
      contract.call(
        "create_lease",
        StellarSdk.nativeToScVal(draft.tenant, { type: "address" }),
        StellarSdk.nativeToScVal(draft.landlord, { type: "address" }),
        StellarSdk.nativeToScVal(draft.token, { type: "address" }),
        StellarSdk.nativeToScVal(BigInt(draft.rentAmount), { type: "i128" }),
        StellarSdk.nativeToScVal(BigInt(draft.depositAmount), { type: "i128" }),
        StellarSdk.nativeToScVal(draft.months, { type: "u32" }),
        StellarSdk.nativeToScVal(draft.firstReleaseLedger, { type: "u32" }),
        StellarSdk.nativeToScVal(draft.releaseIntervalLedgers, { type: "u32" }),
        StellarSdk.nativeToScVal(draft.depositUnlockLedger, { type: "u32" }),
        StellarSdk.nativeToScVal(draft.arbitrators, { type: "vec" }),
      ),
    )
    .setTimeout(60)
    .build();

  const prepared = await rpc.prepareTransaction(tx);
  return prepared.toXDR();
}
