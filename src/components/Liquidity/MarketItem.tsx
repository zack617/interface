/** @jsxImportSource @emotion/react */
import { align } from '../../globalStyle'
import { ReactComponent as DAIIcon } from '../../assets/imgs/tokens/dai.svg'
import KRAVButton from '../KravUIKit/KravButton'
import { MarketItemProps } from './type'
import { useRootStore } from '../../store/root'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { eXDecimals } from '../../utils/math'
import { css } from '@emotion/react'
import { getBigNumberStr } from '../../utils'
import { useGetLpReward } from '../../hook/hookV8/useGetLpReward'

export const MarketItem = ({ setAddLiquidity, poolParams }: MarketItemProps) => {
  const { account } = useWeb3React()
  const getLpReward = useGetLpReward(poolParams.vaultT, poolParams.decimals)
  const [lpReward, setLpReward] = useState(new BigNumber(0))

  // TODO: Withdraw the balance when the dialog box is opened?
  const setLiquidityInfo = useRootStore((store) => store.setLiquidityInfo)
  const setWalletDialogVisibility = useRootStore((store) => store.setWalletDialogVisibility)
  const userPositionDatas = useRootStore((store) => store.userPositionDatas)
  const poolSupply = useMemo(() => {
    const supply =
      userPositionDatas.find((item) => item.pool?.tradingT === poolParams?.tradingT)?.daiDeposited ?? new BigNumber(0)
    return eXDecimals(supply, poolParams.decimals)
  }, [poolParams, userPositionDatas])

  useEffect(() => {
    if (poolSupply.isGreaterThan(0)) {
      getLpReward(setLpReward).then()
    }
  }, [poolSupply])

  return (
    <div className="liquidity-table">
      <div css={align}>
        <DAIIcon height="40" width="40" />
        <div
          css={css`
            margin-left: 8px;
          `}
        >
          <p>{poolParams.symbol}</p>
          <p className="small grey">{poolParams.symbol}</p>
        </div>
      </div>
      <div>1 BTC={poolParams.proportionBTC}</div>
      <div>12.32%</div>
      <div>{isNaN(poolParams.utilization.toNumber()) ? 0 : poolParams.utilization.toFixed(2)}%</div>
      <div>
        <p>
          {poolParams.poolTotalSupply?.toFixed(2)} {poolParams.symbol}
        </p>
        <p className="small grey">({poolParams.poolTotalSupply?.div(poolParams.proportionBTC).toFixed(2)}&nbsp;BTC) </p>
      </div>
      <div>
        {getBigNumberStr(poolSupply, 2)} {poolParams.symbol}
      </div>
      <div>
        {getBigNumberStr(lpReward, 2)} {poolParams.symbol}
      </div>
      <div>
        {account && (
          <KRAVButton
            onClick={() => {
              setAddLiquidity(true)
              setLiquidityInfo(poolParams)
            }}
          >
            Add Liquidity
          </KRAVButton>
        )}
        {!account && (
          <KRAVButton
            onClick={() => {
              setWalletDialogVisibility(true)
            }}
          >
            Connect Wallet
          </KRAVButton>
        )}
      </div>
    </div>
  )
}
