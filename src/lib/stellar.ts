import * as StellarSdk from "@stellar/stellar-sdk";

type NetworkName = "testnet" | "mainnet";

const network = (import.meta.env.VITE_STELLAR_NETWORK ?? "testnet") as NetworkName;

const mainnetRpcUrl = import.meta.env.VITE_STELLAR_MAINNET_RPC_URL;

export const stellarConfig = {
  testnet: {
    rpcUrl: "https://soroban-testnet.stellar.org",
    horizonUrl: "https://horizon-testnet.stellar.org",
    networkPassphrase: StellarSdk.Networks.TESTNET,
    friendbotUrl: "https://friendbot.stellar.org",
  },
  mainnet: {
    rpcUrl: mainnetRpcUrl,
    horizonUrl: "https://horizon.stellar.org",
    networkPassphrase: StellarSdk.Networks.PUBLIC,
    friendbotUrl: null,
  },
}[network];

if (!stellarConfig.rpcUrl) {
  throw new Error("Missing VITE_STELLAR_MAINNET_RPC_URL for mainnet");
}

export const rpc = new StellarSdk.rpc.Server(stellarConfig.rpcUrl);
export const horizon = new StellarSdk.Horizon.Server(stellarConfig.horizonUrl);

export function shortAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
