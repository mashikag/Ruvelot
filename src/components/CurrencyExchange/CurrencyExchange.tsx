import React, { ReactElement, ChangeEventHandler, ReactEventHandler } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrencyExchangePocket from './CurrencyExchangePocket'
import CurrencyExchangeRate from './CurrencyExchangeRate'
import { CurrencyExchangeState, StoreState, Currency, CurrencyExchangeActionTypes, CurrencyAccountBalances } from '../../store/types';
import { setExchangeFromCurrency, setExchangeToCurrency, setExchangeFromAmount, setExchangeToAmount, setCurrencyAccountBalance } from '../../store/index';

function CurrencyExchange(): ReactElement<{}> {
  const state = useSelector<StoreState, CurrencyExchangeState>(
    ({ currencyExchange }) => currencyExchange
  );

  const currencyAccountBalances: CurrencyAccountBalances = useSelector<StoreState, CurrencyAccountBalances>(
    ({ currencyAccounts }) => currencyAccounts.currencyAccountBalances
  );

  const dispatch = useDispatch();

  const onExchangeFromCurrencyChange:
    ChangeEventHandler<HTMLSelectElement> =
    ({ target }) => dispatch(setExchangeFromCurrency(target.value as Currency))

  const onExchangeToCurrencyChange:
    ChangeEventHandler<HTMLSelectElement> =
    ({ target }) => dispatch(setExchangeToCurrency(target.value as Currency))

  const onExchangeFromAmountChange: (amount: number | null) => void =
    (amount) =>
      dispatchIfAmountChanged(
        state.exchangeToAmount,
        amount,
        setExchangeFromAmount(amount)
      )

  const onExchangeToAmountChange: (amount: number | null) => void =
    (amount) =>
      dispatchIfAmountChanged(
        state.exchangeToAmount,
        amount,
        setExchangeToAmount(amount)
      )


  const dispatchIfAmountChanged:
    (oldAmount: number | null, newAmount: number | null, action: CurrencyExchangeActionTypes) => void =
    (oldAmount, newAmount, action) => {
      if (oldAmount !== newAmount) {
        dispatch(action)
      }
    }

  const onSubmitExchange: ReactEventHandler<HTMLButtonElement> =
    ({ target }) => {
      dispatch(setCurrencyAccountBalance(
        (currencyAccountBalances[state.exchangeFromCurrency] || 0) - state.exchangeFromAmount,
        state.exchangeFromCurrency
      ))
      dispatch(setCurrencyAccountBalance(
        (currencyAccountBalances[state.exchangeToCurrency] || 0) + state.exchangeToAmount,
        state.exchangeToCurrency
      ))
    }

  const exchangeToCurrencyRate: number = state.rates[state.exchangeToCurrency] || 1
  const exchangeFromCurrencyRate: number = state.rates[state.exchangeFromCurrency] || 1
  const exchangeRate = exchangeToCurrencyRate / exchangeFromCurrencyRate

  const disableExchangeSubmit =
    !currencyAccountBalances[state.exchangeFromCurrency] ||
    !state.exchangeFromAmount || state.exchangeFromAmount <= 0 ||
    state.exchangeFromAmount > currencyAccountBalances[state.exchangeFromCurrency]

  return (
    <div>
      <CurrencyExchangeRate
        fromCurrency={state.exchangeFromCurrency}
        toCurrency={state.exchangeToCurrency}
        rate={exchangeRate}
      />
      <CurrencyExchangePocket
        currency={state.exchangeFromCurrency}
        amount={state.exchangeFromAmount}
        onCurrencyChange={onExchangeFromCurrencyChange}
        onAmountChange={onExchangeFromAmountChange}
        rates={state.rates}
      />
      <CurrencyExchangePocket
        currency={state.exchangeToCurrency}
        amount={state.exchangeToAmount}
        onCurrencyChange={onExchangeToCurrencyChange}
        onAmountChange={onExchangeToAmountChange}
        rates={state.rates}
      />
      <button onClick={onSubmitExchange} disabled={disableExchangeSubmit}>Exchange</button>
    </div>
  );
}

export default CurrencyExchange
