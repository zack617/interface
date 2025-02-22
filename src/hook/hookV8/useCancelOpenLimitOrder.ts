import { useTradingV6Contract } from './useContract'
import { useCallback } from 'react'
import { getGasLimit } from '../../utils'
import BigNumber from 'bignumber.js'
import { useGetUserOpenLimitOrders } from './useGetUserOpenLimitOrders'
import { useUpdateError } from './useUpdateError'
import { useRootStore } from '../../store/root'
import { TransactionAction, TransactionState } from '../../store/TransactionSlice'
import { useUpdateSuccessDialog } from './useUpdateSuccessDialog'

export const useCancelOpenLimitOrder = (tradingAddress: string, storageAddress: string) => {
  const contract = useTradingV6Contract(tradingAddress)!
  const getUserOpenLimitOrders = useGetUserOpenLimitOrders(storageAddress)
  const updateError = useUpdateError()
  const updateSuccessDialog = useUpdateSuccessDialog()
  const setTransactionState = useRootStore((store) => store.setTransactionState)
  const setTransactionDialogVisibility = useRootStore((store) => store.setTransactionDialogVisibility)
  const setSuccessSnackbarInfo = useRootStore((store) => store.setSuccessSnackbarInfo)
  return useCallback(
    async (orderIndex: number, pairIndex = 0) => {
      try {
        const params = [pairIndex, orderIndex] as any
        let gasLimit = await getGasLimit(contract, 'cancelOpenLimitOrder', params)
        gasLimit = new BigNumber(gasLimit.toString()).times(1.1)
        setTransactionState(TransactionState.INTERACTION)
        setTransactionDialogVisibility(true)
        const tx = await contract.cancelOpenLimitOrder(...params, { gasLimit: gasLimit.toFixed(0) })
        setTransactionState(TransactionState.CANCEL_LIMIT_ORDER)
        console.log('tx', await tx.wait())
        setTransactionDialogVisibility(false)
        setTransactionState(TransactionState.START)
        const close = await getUserOpenLimitOrders()
        updateSuccessDialog(TransactionAction.CANCEL_LIMIT_ORDER)
        setSuccessSnackbarInfo({
          snackbarVisibility: true,
          title: 'Cancel Limit Order',
          content: `Cancel limit order successfully`,
        })
        console.log('close tx', close)
      } catch (e) {
        updateError(TransactionAction.CANCEL_LIMIT_ORDER)
      }
    },
    [contract, tradingAddress, storageAddress]
  )
}
