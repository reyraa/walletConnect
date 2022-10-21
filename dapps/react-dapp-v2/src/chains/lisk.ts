import { ChainsMap } from "caip-api";
import { NamespaceMetadata, ChainMetadata } from "../helpers";

// TODO: add `lisk` namespace to `caip-api` package to avoid manual specification here.
export const LiskChainData: ChainsMap = {
  "10000001": {
    id: "lisk:1",
    name: "Lisk Mainnet",
    rpc: ["https://api.mainnet-beta.solana.com", "https://solana-api.projectserum.com"],
    slip44: 501,
    testnet: false,
  },
  "10000000": {
    id: "lisk:2",
    name: "Lisk Devnet",
    rpc: ["https://service.lisk.com"],
    slip44: 501,
    testnet: true,
  },
};

export const LiskMetadata: NamespaceMetadata = {
  // Lisk Mainnet
  "10000001": {
    logo: "/solana_logo.png",
    rgb: "0, 0, 0",
  },
  // Lisk Devnet
  "10000000": {
    logo: "/solana_logo.png",
    rgb: "0, 0, 0",
  },
};

export function getChainMetadata(chainId: string): ChainMetadata {
  const reference = chainId.split(":")[1];
  const metadata = LiskMetadata[reference];
  if (typeof metadata === "undefined") {
    throw new Error(`No chain metadata found for chainId: ${chainId}`);
  }
  return metadata;
}
