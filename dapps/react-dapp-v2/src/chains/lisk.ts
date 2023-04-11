import { ChainsMap } from "caip-api";
import { NamespaceMetadata, ChainMetadata } from "../helpers";

// TODO: add `lisk` namespace to `caip-api` package to avoid manual specification here.
export const LiskChainData: ChainsMap = {
  "00000000": {
    id: "lisk:04000000",
    name: "Lisk Mainnet",
    rpc: ["https://service.lisk.com", "https://solana-api.projectserum.com"],
    slip44: 501,
    testnet: false,
  },
  "04000000": {
    id: "lisk:04000000",
    name: "Lisk Devnet",
    rpc: ["https://testnet.service.lisk.com"],
    slip44: 501,
    testnet: true,
  },
};

export const LiskMetadata: NamespaceMetadata = {
  // Lisk Mainnet
  "00000000": {
    logo: "https://lisk-qa.ams3.digitaloceanspaces.com/lisk.png",
    rgb: "0, 0, 0",
  },
  // Lisk Devnet
  "04000000": {
    logo: "https://lisk-qa.ams3.digitaloceanspaces.com/lisk.png",
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
