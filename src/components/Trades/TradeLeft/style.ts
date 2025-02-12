import { css } from '@emotion/react'

export const myTrade = css`
  margin-top: 18px;
  background: #fff;
  border-radius: 8px;
  min-height: 371px;
  .position-layout {
    align-items: center;
    display: grid;
    padding: 12px 24px 0px;
    grid-template-columns: 140px minmax(140px, 1fr) 1fr 1fr 1fr 1fr 1fr 0.5fr;
    font-size: 12px;
  }
  .order-layout {
    align-items: center;
    display: grid;
    padding: 12px 24px 0px;
    grid-template-columns: 80px minmax(140px, 2fr) 1fr 1fr 1fr 1fr 1fr;
    font-size: 12px;
  }
  .no-data {
    padding-top: 103px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #757575;
  }
`
