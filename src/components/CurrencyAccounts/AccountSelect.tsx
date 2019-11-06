import React, { ReactElement, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { Currency, StoreState } from '../../store/types';
import { selectCurrencyAccount } from '../../store/index';
import CurrencySelect from '../CurrencySelect/CurrencySelect';

function AccountSelect(): ReactElement<any> {
  const dispatch = useDispatch();

  const currencyAccounts = useSelector<StoreState, Currency[]>(
    ({ currencyAccounts }) =>
      (Object.keys(currencyAccounts.currencyAccountBalances)) as Currency[],
    shallowEqual
  )

  const onAccountSelection = useCallback(
    (accountCurrency: Currency) =>
      dispatch(selectCurrencyAccount(accountCurrency)),
    [dispatch]
  )

  return <CurrencySelect currencies={currencyAccounts} onCurrencyChange={onAccountSelection} />
}

export default AccountSelect