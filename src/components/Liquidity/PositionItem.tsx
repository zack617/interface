/** @jsxImportSource @emotion/react */
import { align } from '../../globalStyle'
import { ReactComponent as DAIIcon } from '../../assets/imgs/tokens/dai.svg'
import { css } from '@emotion/react'
import { Button, Tooltip } from '@mui/material'
import { ReactComponent as AddIcon } from '../../assets/imgs/addIcon.svg'
import { ReactComponent as SubIcon } from '../../assets/imgs/subIcon.svg'
import { PositionItemProps } from './type'
import { useRootStore } from '../../store/root'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { eXDecimals } from '../../utils/math'

export const PositionItem = ({ position, setAddLiquidity, setRemoveLiquidity }: PositionItemProps) => {
  const setLiquidityInfo = useRootStore((store) => store.setLiquidityInfo)
  const lockAmount = useMemo(() => {
    if (position) {
      const maxWithdrawAmount =
        position.maxDaiDeposited.times(position.pool.maxWithdrawP.div(100)).toNumber() ?? new BigNumber(0)
      const lockedAmount = position.daiDeposited.minus(maxWithdrawAmount)
      return eXDecimals(lockedAmount.isGreaterThan(0) ? lockedAmount : position.daiDeposited, position.pool.decimals)
    } else {
      return new BigNumber(0)
    }
  }, [position])
  return (
    <div className="liquidity-table">
      <div css={align}>
        <DAIIcon height="40" width="40" />
        <div
          css={css`
            margin-left: 8px;
          `}
        >
          <p>{position.pool.symbol}</p>
          <p className="small grey">{position.pool.symbol}</p>
        </div>
      </div>
      <div>
        1 BTC={position.pool.proportionBTC} {position.pool.symbol}
      </div>
      <div>12.32%</div>
      <div>{position.pool.utilization.toFixed(2)}%</div>
      <div>
        <p>
          {eXDecimals(position.daiDeposited, position.pool.decimals).toFixed(2)} {position.pool.symbol}
        </p>
        <p className="small grey">
          ({eXDecimals(position.daiDeposited, position.pool.decimals).div(position.pool.proportionBTC).toFixed(2)}
          &nbsp;BTC)
        </p>
      </div>
      <div>
        {position.withdrawBlock.plus(43200).isGreaterThan(position.pool.blockNumber)
          ? eXDecimals(position.daiDeposited, position.pool.decimals).toFixed(2)
          : lockAmount.toFixed(2)}
      </div>

      <div>
        <Tooltip title={`Current block: ${position.pool.blockNumber}`}>
          <span>
            {position.withdrawBlock.plus(43200).isGreaterThan(position.pool.blockNumber)
              ? position.withdrawBlock.plus(43200).toFixed(0)
              : '--'}
          </span>
        </Tooltip>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: end;
        `}
      >
        <Button
          onClick={() => {
            setLiquidityInfo(position.pool)
            setAddLiquidity(true)
          }}
          sx={{
            height: '32px',
            width: '32px',
            minWidth: '32px',
            border: '1px solid #2E2E2E',
            margin: '12px',
          }}
        >
          <AddIcon height="17" width="17" />
        </Button>
        <Button
          disabled={position.withdrawBlock.plus(43200).isGreaterThan(position.pool.blockNumber)}
          onClick={() => {
            setLiquidityInfo(position.pool)
            setRemoveLiquidity(true)
          }}
          sx={{
            height: '32px',
            width: '32px',
            minWidth: '32px',
            border: '1px solid #2E2E2E',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              pointerEvents: 'auto',
            },
          }}
        >
          <SubIcon height="17" width="17" />
        </Button>
      </div>
    </div>
  )
}
