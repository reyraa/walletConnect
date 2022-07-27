import LiskLib from '@/lib/LiskLib'

export let wallet1: LiskLib
export let wallet2: LiskLib
export let liskWallets: Record<string, LiskLib>
export let liskAddresses: string[]

let address1: string
let address2: string

/**
 * Utilities
 */
export async function createOrRestoreLiskWallet() {
  const secretKey1 = localStorage.getItem('LISK_SECRET_KEY_1')
  const secretKey2 = localStorage.getItem('LISK_SECRET_KEY_2')

  if (secretKey1 && secretKey2) {
    const secretArray1: number[] = Object.values(JSON.parse(secretKey1))
    const secretArray2: number[] = Object.values(JSON.parse(secretKey2))
    wallet1 = LiskLib.init({ secretKey: Uint8Array.from(secretArray1) })
    wallet2 = LiskLib.init({ secretKey: Uint8Array.from(secretArray2) })
  } else {
    wallet1 = LiskLib.init({})
    wallet2 = LiskLib.init({})

    // Don't store secretKey in local storage in a production project!
    localStorage.setItem(
      'LISK_SECRET_KEY_1',
      JSON.stringify(Array.from(wallet1.keypair.secretKey))
    )
    localStorage.setItem(
      'LISK_SECRET_KEY_2',
      JSON.stringify(Array.from(wallet2.keypair.secretKey))
    )
  }

  console.log('createOrRestoreLiskWallet', wallet1, wallet2);

  address1 = await wallet1.getAddress()
  address2 = await wallet2.getAddress()

  liskWallets = {
    [address1]: wallet1,
    [address2]: wallet2
  }
  liskAddresses = Object.keys(liskWallets)

  return {
    liskWallets,
    liskAddresses
  }
}
