import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { StoreState } from '../../store/types'

function CurrencyAccountBalance(): ReactElement {
  const balance: number = useSelector(
    ({
      currencyAccounts: {
        currencyAccountBalances,
        selectedCurrencyAccount
      }
    }: StoreState) =>
      currencyAccountBalances[selectedCurrencyAccount] || 0
  )

  const balanceWithTwoDecimalPoints = balance.toFixed(2);

  return (
    <AccountBalance title={balanceWithTwoDecimalPoints}>
      {balanceWithTwoDecimalPoints}
    </AccountBalance>
  )
}

export default CurrencyAccountBalance

const AccountBalance =
  styled.span({
    fontSize: '2em',
    lineHeight: '2.1em',
    width: '200px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  })