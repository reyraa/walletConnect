// import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import nacl from 'tweetnacl'
import { transactions, cryptography } from '@liskhq/lisk-client';

/**
 * Types
 */
interface IInitArguments {
  secretKey?: Uint8Array
}

interface Keypair {
  publicKey: Buffer;
  secretKey: Buffer;
}

interface LiskSignTransaction {
  moduleID: number;
  assetID: number;
  id: Buffer;
  senderPublicKey: Buffer;
  nonce: bigint;
  fee: bigint;
  asset: any;
}

interface ILiskWallet {
  getAccounts(): Promise<{
    pubkey: string;
  }[]>;
  signTransaction(address: string, serialisedTransaction: LiskSignTransaction): Promise<{
      signature: string;
  }>;
  signMessage(address: string, message: string): Promise<{
      signature: string;
  }>;
}

class LiskWallet implements ILiskWallet {
  constructor(secretKey) {

  }

  async getAddress() {
    return '';
  }

  async getAccounts() {
    return [{ pubkey: '' }];
  }
  async signTransaction(address, serialisedTransaction) {
    return { signature: '' };
  }
  async signMessage(address, message) {
    return { signature: '' };
  }
}

/**
 * Library
 */
export default class LiskLib {
  keypair: Keypair
  liskWallet: ILiskWallet

  constructor(keypair: Keypair) {
    this.keypair = keypair
    this.liskWallet = new LiskWallet(Buffer.from(keypair.secretKey))
  }

  static init({ secretKey }: IInitArguments) {
    // @todo This is not the correct way of converting secret key to passphrase.
    // I did this only to limit the changes I had to make.
    // This should also generate a new account if a secretKey is not passed, meaning,
    // it should pass a random passphrase instead of empty string if secretKey is nullish
    const str = secretKey?.reduce((acc, item) => {
      acc += String.fromCharCode(item)
      return acc;
    }, '') ?? '';

    const keyPair = cryptography.getKeys(str);

    return new LiskLib({
      publicKey: keyPair.publicKey,
      secretKey: keyPair.privateKey,
    })
  }

  public async getAddress() {
    return cryptography.getBase32AddressFromPublicKey(this.keypair.publicKey).toString('hex');
  }

  public getSecretKey() {
    return this.keypair.secretKey.toString()
  }

  public async signMessage(message: string) {
    const msgBytes = cryptography.digestMessage(message);
    const signedMessage = cryptography.signDataWithPrivateKey(msgBytes, this.keypair.secretKey);
    return { signature: signedMessage }
  }

  public async signTransaction(
    rawTx: any, networkIdentifier: string,
  ) {
    // @todo We might hve to make an API call and retrieve the schemas
    const schema = {
      "$id": "lisk/transfer-asset",
      "title": "Transfer transaction asset",
      "type": "object",
      "required": ["amount", "recipientAddress", "data"],
      "properties": {
        "amount": { "dataType": "uint64", "fieldNumber": 1 },
        "recipientAddress": { "dataType": "bytes", "fieldNumber": 2 },
        "data": { "dataType": "string", "fieldNumber": 3 }
      }
    };
    const transaction = {
      moduleID: rawTx.moduleID,
      assetID: rawTx.assetID,
      nonce: BigInt(rawTx.nonce),
      fee: BigInt(rawTx.fee),
      senderPublicKey: this.keypair.publicKey,
      asset: {
        data: rawTx.asset.data,
        amount: BigInt(rawTx.asset.amount),
        recipientAddress: cryptography.getAddressFromBase32Address(rawTx.asset.recipientAddress),
      }
    };
    const res = transactions.signTransactionWithPrivateKey(
      schema,
      transaction,
      Buffer.from(networkIdentifier),
      this.keypair.secretKey,
    );
    console.log('res', res);

    return { signature: res.signatures, id: res.id }
  }
}
