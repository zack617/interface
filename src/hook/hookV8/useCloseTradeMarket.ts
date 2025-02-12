import { useTradingV6Contract } from './useContract'
import { useCallback } from 'react'
import { getGasLimit } from '../../utils'
import BigNumber from 'bignumber.js'
import { useGetUserOpenTrade } from './useGetUserOpenTrade'
import { useUpdateError } from './useUpdateError'
import { useRootStore } from '../../store/root'
import { TransactionAction, TransactionState } from '../../store/TransactionSlice'
import { useUpdateSuccessDialog } from './useUpdateSuccessDialog'

export const useCloseTradeMarket = (tradingAddress: string, storageAddress: string) => {
  const contract = useTradingV6Contract(tradingAddress)!
  const getUserOpenTrade = useGetUserOpenTrade(storageAddress)
  const updateError = useUpdateError()
  const updateSuccessDialog = useUpdateSuccessDialog()
  const setTransactionState = useRootStore((store) => store.setTransactionState)
  const setTransactionDialogVisibility = useRootStore((store) => store.setTransactionDialogVisibility)
  const setSuccessSnackbarInfo = useRootStore((store) => store.setSuccessSnackbarInfo)
  return useCallback(
    async (orderIndex: number, pairIndex = 0) => {
      try {
        const params = [pairIndex, orderIndex] as any
        let gasLimit = await getGasLimit(contract, 'closeTradeMarket', params)
        gasLimit = new BigNumber(gasLimit.toString()).times(1.1)
        setTransactionState(TransactionState.INTERACTION)
        setTransactionDialogVisibility(true)
        const tx = await contract.closeTradeMarket(...params, { gasLimit: gasLimit.toFixed(0) })
        setTransactionState(TransactionState.CANCEL_MARKET_ORDER)
        const closeTradeMarketTX = await tx.wait()
        console.log('tx', closeTradeMarketTX)
        setTransactionDialogVisibility(false)
        setTransactionState(TransactionState.START)
        const close = await getUserOpenTrade()
        updateSuccessDialog(TransactionAction.CANCEL_MARKET_ORDER)
        setSuccessSnackbarInfo({
          snackbarVisibility: true,
          title: 'Cancel Market Order',
          content: `Cancel market order successfully`,
        })
        console.log('close tx ', close)
      } catch (e) {
        updateError(TransactionAction.CANCEL_MARKET_ORDER)
      }
    },
    [contract, tradingAddress, storageAddress]
  )
}
