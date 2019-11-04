import React from 'react'
import { useSelector } from 'react-redux'
import { Currency, StoreState } from '../../store/types'

export interface AccountBalanceState {
  currency: Currency,
  balance: Number
}

function AccountBalance(): React.ReactElement<any> {
  const { currency, balance } = useSelector<StoreState, AccountBalanceState>(
    (store) => {
      const { currencyAccountBalances: balances, selectedCurrencyAccount: currency } = store.currencyAccounts
      return {
        balance: balances[currency] || 0,
        currency
      }
    }
  )
  return (
    <div>
      {`${currency} ${balance.toFixed(2)}`}
    </div>
  )
}

export default AccountBalance
