import { useCallback, useEffect, useState } from "react";
import {
  getAddress,
  getNetwork,
  isAllowed,
  isConnected,
  requestAccess,
  signTransaction,
} from "@stellar/freighter-api";
import { stellarConfig } from "./stellar";

export function useFreighter() {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const connected = await isConnected();
    if (!connected.isConnected) return;

    const allowed = await isAllowed();
    if (!allowed.isAllowed) return;

    const addressResult = await getAddress();
    const networkResult = await getNetwork();
    setAddress(addressResult.address);
    setNetwork(networkResult.network);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const connect = useCallback(async () => {
    setError(null);
    const connected = await isConnected();
    if (!connected.isConnected) {
      setError("Freighter is not installed.");
      return null;
    }

    const result = await requestAccess();
    if (result.error) {
      setError(result.error);
      return null;
    }

    await refresh();
    return result.address;
  }, [refresh]);

  const sign = useCallback(async (xdr: string) => {
    const signed = await signTransaction(xdr, {
      networkPassphrase: stellarConfig.networkPassphrase,
    });
    if (signed.error) throw new Error(signed.error);
    return signed.signedTxXdr;
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setNetwork(null);
  }, []);

  return { address, network, error, connect, disconnect, sign };
}
