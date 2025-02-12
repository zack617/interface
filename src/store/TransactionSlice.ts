import { StateCreator } from 'zustand'
import { RootStore } from './root'
import { PoolParams } from './FactorySlice'

export enum TransactionState {
  START = 'Start transaction',
  CHECK_APPROVE = 'Check approve',
  APPROVE = 'Approve...',
  INTERACTION = 'Interaction...',
  START_OPEN_TRADE = 'Start open trade',
  APPROVE_SUCCESS = 'Approve success',
  OPEN_TRADE_SUCCESS = 'Open trade success',
  ADD_LIQUIDITY = 'add liquidity...',
  CREAT_POOL = 'Creat pool...',
  STAKE = 'Stake...',
  REMOVE_LIQUIDITY = 'Remove liquidity...',
  CLAIM_LP_REWARD = 'Claim LP reward...',
  CANCEL_LIMIT_ORDER = 'Cancel limit order...',
  CANCEL_MARKET_ORDER = 'Cancel market order...',
  FAUCET_TEST_TOKEN = 'faucet token...',
  STAKE_KRAV = 'stake krav',
  WITHDRAW_KRAV = 'withdraw krav',
  CLAIM_KRAV_REWARD = 'claim krav reward',
}

export enum CreatPoolState {
  CONFIRM = 'CONFIRM',
  CREAT_POOL = 'CREAT_POOL',
  APPROVE = 'APPROVE',
  STAKE = 'STAKE',
}

export enum TransactionAction {
  NONE = '',
  WALLET = 'wallet',
  OPEN_TRADE = 'open trade',
  ADD_LIQUIDITY = 'add liquidity',
  CREATE = 'create pool',
  REMOVE_LIQUIDITY = 'remove liquidity',
  CANCEL_LIMIT_ORDER = 'cancel limit order',
  CANCEL_MARKET_ORDER = 'cancel market order',
  APPROVE = 'approve',
  ADDRESS_CHECK = 'token address check',
  CLAIM_LP_REWARD = 'claim lp reward',
  FAUCET_TEST_TOKEN = 'faucet token',
  STAKE_KRAV = 'stake krav',
  WITHDRAW_KRAV = 'withdraw krav',
  CLAIM_KRAV_REWARD = 'claim krav reward',
}

export type ErrorContent = {
  dialogVisibility: boolean
  action: TransactionAction
  reason?: string
}

export type SuccessContent = {
  dialogVisibility: boolean
  action: TransactionAction
}

export type SuccessSnackbarInfo = {
  snackbarVisibility: boolean
  title: string
  content: string
}

export interface TransactionSlice {
  transactionState: TransactionState
  setTransactionState: (TransactionState: TransactionState) => void
  creatPoolState: CreatPoolState
  setCreatPoolState: (creatPoolState: CreatPoolState) => void
  liquidityInfo: PoolParams
  setLiquidityInfo: (liquidityInfo: PoolParams) => void
  errorContent: ErrorContent
  successContent: SuccessContent
  setSuccessContent: (SuccessContent: SuccessContent) => void
  setErrorContent: (ErrorContent: ErrorContent) => void
  transactionDialogVisibility: boolean
  setTransactionDialogVisibility: (transactionDialogVisibility: boolean) => void
  successSnackbarInfo: SuccessSnackbarInfo
  setSuccessSnackbarInfo: (successSnackbarInfo: SuccessSnackbarInfo) => void
}

export const createTransactionSlice: StateCreator<
  RootStore,
  [['zustand/subscribeWithSelector', never], ['zustand/devtools', never]],
  [],
  TransactionSlice
> = (set) => ({
  transactionState: TransactionState.START,
  liquidityInfo: {} as PoolParams,
  errorContent: {
    dialogVisibility: false,
    action: TransactionAction.NONE,
  },
  successContent: {
    dialogVisibility: false,
    action: TransactionAction.NONE,
  },
  successSnackbarInfo: {
    snackbarVisibility: false,
    title: '',
    content: '',
  },
  transactionDialogVisibility: false,
  setTransactionState(transactionState) {
    set({ transactionState: transactionState })
  },
  creatPoolState: CreatPoolState.CONFIRM,
  setCreatPoolState(creatPoolState) {
    set({ creatPoolState: creatPoolState })
  },
  setLiquidityInfo(liquidityInfo) {
    set({ liquidityInfo: liquidityInfo })
  },
  setErrorContent(errorContent) {
    set({ errorContent: errorContent })
  },
  setSuccessContent(successContent) {
    set({ successContent: successContent })
  },
  setTransactionDialogVisibility(transactionDialogVisibility) {
    set({ transactionDialogVisibility: transactionDialogVisibility })
  },
  setSuccessSnackbarInfo(successSnackbarInfo) {
    set({ successSnackbarInfo: successSnackbarInfo })
  },
})
