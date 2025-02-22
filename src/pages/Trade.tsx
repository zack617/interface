/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TradeLeft } from 'components/Trades/TradeLeft'
import { TradeRight } from '../components/Trades/TradeRight'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useRootStore } from '../store/root'
import { useLocation } from 'react-router-dom'
import { VALIDITY_ADDRESS_LENGTH } from '../constant/math'
import { decodeReferral } from '../utils'

export const Trade = () => {
  const [leverage, setLeverage] = useState(2)
  const [positionSizeDai, setPositionSizeDai] = useState(new BigNumber(0))
  const [isBuy, setIsBuy] = useState(true)
  const [tpPrice, setTpPrice] = useState<string | BigNumber>('')
  const [slPrice, setSlPrice] = useState<string | BigNumber>('')
  const [tradeType, setTradeType] = useState(0)
  const BTCPrice = useRootStore((state) => state.BTCPrice)
  const [limitPrice, setLimitPrice] = useState<string | BigNumber>(BTCPrice)
  const { pathname } = useLocation()

  useEffect(() => {
    const referralBase64Str = pathname.split('/').length > 2 ? pathname.split('/')[2] : null
    if (referralBase64Str) {
      const referral = decodeReferral(referralBase64Str)
      // TODO Check is a account address
      if (referral.length === VALIDITY_ADDRESS_LENGTH) {
        localStorage.setItem('krav-referral', referralBase64Str)
      }
    }
  }, [pathname])

  return (
    <div
      css={css`
        display: flex;
        padding: 16px 32px 0;
        width: 100%;
        font-family: 'Inter';
      `}
    >
      <TradeLeft
        tradeType={tradeType}
        isBuy={isBuy}
        positionSizeDai={positionSizeDai}
        leverage={leverage}
        limitPrice={limitPrice}
      />
      <TradeRight
        leverage={leverage}
        setLeverage={setLeverage}
        positionSizeDai={positionSizeDai}
        setPositionSizeDai={setPositionSizeDai}
        isBuy={isBuy}
        setIsBuy={setIsBuy}
        tpPrice={tpPrice}
        setTpPrice={setTpPrice}
        slPrice={slPrice}
        setSlPrice={setSlPrice}
        limitPrice={limitPrice}
        setLimitPrice={setLimitPrice}
        tradeType={tradeType}
        setTradeType={setTradeType}
      />
    </div>
  )
}
