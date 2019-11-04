import React, { ReactElement, ChangeEventHandler } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Currency, StoreState } from '../../store/types';
import { selectCurrencyAccount } from '../../store/index';

function getAccountSelectionItems(currencyAccounts: Currency[]):
  JSX.Element[] {
  return currencyAccounts.map(
    currencyAccount =>
      <option key={currencyAccount} value={currencyAccount}>{currencyAccount}</option>
  )
}

function AccountSelector(): ReactElement<any> {
  const dispatch = useDispatch();

  const currencyAccounts = useSelector<StoreState, Currency[]>(
    ({ currencyAccounts }) =>
      (Object.keys(currencyAccounts.currencyAccountBalances)) as Currency[]
  )

  const onAccountSelection: ChangeEventHandler<HTMLSelectElement> = ({ target }) => {
    const accountCurrency = target.value as Currency
    dispatch(selectCurrencyAccount(accountCurrency))
  }

  return (
    <select onChange={onAccountSelection}>
      {getAccountSelectionItems(currencyAccounts)}
    </select>
  );
}

export default AccountSelector
