/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { YourPositionProps } from './type'
import { PositionItem } from './PositionItem'
import { useRootStore } from '../../store/root'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { MarketSkeleton } from './MarketSkeleton'

export const YourPosition = ({ setAddLiquidity, setRemoveLiquidity, isLoadingUserPosition }: YourPositionProps) => {
  const { account } = useWeb3React()
  const userPositionDatas = useRootStore((store) => store.userPositionDatas)

  const positionDatas = useMemo(() => {
    let flag = false
    userPositionDatas.find((positionData) => {
      if (positionData?.hasPosition) flag = true
    })
    if (flag) return userPositionDatas.filter((position) => position.hasPosition)
    else return []
  }, [userPositionDatas])

  return (
    <div className="liquidity-content">
      <div className="liquidity-tabs">
        <span>Your positions</span>
        <span>{positionDatas.length > 0 ? ` (${positionDatas.length})` : ''}</span>
      </div>
      <div>
        <div
          className="liquidity-table grey nowrap"
          css={css`
            margin-top: 24px;
          `}
        >
          <div>ASSET</div>
          <div>PER TICKET PRICE</div>
          <div>APR</div>
          <div>UTILIZATION</div>
          <div>YOUR LIQUIDITY SUPPLY</div>
          <div>LOCKED</div>
          <div>WITHDRAW_BLOCK</div>
        </div>
        {!account && <div className="no-data">Connect Wallet</div>}
        {account && isLoadingUserPosition && positionDatas.length === 0 && <MarketSkeleton />}
        {account && !isLoadingUserPosition && positionDatas.length === 0 && (
          <div className="no-data">No Position yet</div>
        )}
        {account &&
          positionDatas.length > 0 &&
          positionDatas.map((position, index) => {
            return (
              <PositionItem
                key={position.pool?.tradingT + index}
                position={position}
                setAddLiquidity={setAddLiquidity}
                setRemoveLiquidity={setRemoveLiquidity}
              />
            )
          })}
      </div>
    </div>
  )
}
