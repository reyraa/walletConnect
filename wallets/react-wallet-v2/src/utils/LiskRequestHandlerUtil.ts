import { LISK_SIGNING_METHODS } from '@/data/LiskData'
import { getWalletAddressFromParams } from '@/utils/HelperUtil'
import { liskAddresses, liskWallets } from '@/utils/LiskWalletUtil'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'

export async function approveLiskRequest(
  requestEvent: SignClientTypes.EventArguments['session_request']
) {
  const { params, id } = requestEvent
  const { request } = params
  const wallet = liskWallets[getWalletAddressFromParams(liskAddresses, params)]

  switch (request.method) {
    case LISK_SIGNING_METHODS.LISK_SIGN_MESSAGE:
      const signedMessage = await wallet.signMessage(request.params.message)
      return formatJsonRpcResult(id, signedMessage)

    case LISK_SIGNING_METHODS.LISK_SIGN_TRANSACTION:
      const signedTransaction = await wallet.signTransaction(
        request.params.rawTx,
        request.params.networkIdentifier,
      )

      return formatJsonRpcResult(id, signedTransaction)

    default:
      throw new Error(getSdkError('INVALID_METHOD').message)
  }
}

export function rejectLiskRequest(request: SignClientTypes.EventArguments['session_request']) {
  const { id } = request

  return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message)
}
