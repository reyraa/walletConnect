import { ChainsMap } from "caip-api";
import { NamespaceMetadata, ChainMetadata } from "../helpers";

// TODO: add `lisk` namespace to `caip-api` package to avoid manual specification here.
export const LiskChainData: ChainsMap = {
  "4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ": {
    id: "lisk:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ",
    name: "Lisk Mainnet",
    rpc: ["https://api.mainnet-beta.solana.com", "https://solana-api.projectserum.com"],
    slip44: 501,
    testnet: false,
  },
  "8E9rvCKLFQia2Y35HXjjpWzj8weVo44K": {
    id: "lisk:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K",
    name: "Lisk Devnet",
    rpc: ["https://api.devnet.solana.com"],
    slip44: 501,
    testnet: true,
  },
};

export const LiskMetadata: NamespaceMetadata = {
  // Lisk Mainnet
  "4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ": {
    logo: "/solana_logo.png",
    rgb: "0, 0, 0",
  },
  // Lisk Devnet
  "8E9rvCKLFQia2Y35HXjjpWzj8weVo44K": {
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
