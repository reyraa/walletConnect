/**
 * Types
 */
 export type TLiskChain = keyof typeof LISK_MAINNET_CHAINS

 /**
  * Chains
  */
 export const LISK_MAINNET_CHAINS = {
   'lisk:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ': {
     chainId: '4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
     name: 'Lisk',
     logo: '/chain-logos/solana-4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ.png',
     rgb: '30, 240, 166',
     rpc: ''
   }
 }
 
 export const LISK_TEST_CHAINS = {
   'lisk:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K': {
     chainId: '8E9rvCKLFQia2Y35HXjjpWzj8weVo44K',
     name: 'Lisk Devnet',
     logo: '/chain-logos/solana-4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ.png',
     rgb: '30, 240, 166',
     rpc: ''
   }
 }
 
 export const LISK_CHAINS = { ...LISK_MAINNET_CHAINS, ...LISK_TEST_CHAINS }
 
 /**
  * Methods
  */
 export const LISK_SIGNING_METHODS = {
   LISK_SIGN_TRANSACTION: 'lisk_signTransaction',
   LISK_SIGN_MESSAGE: 'lisk_signMessage'
 }
 