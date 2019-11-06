import React, { ReactElement, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { StoreState } from '../../store/types';
import { setCurrencyAccountBalance } from '../../store';

function SubmitExchangeButton(): ReactElement {
  const {
    fromAmount,
    fromCurrency,
    fromCurrencyAccountBalance,
    toAmoumnt,
    toCurrency,
    toCurrencyAccountBalance,
  } = useSelector(
    ({
      currencyExchange: {
        exchangeFromAmount,
        exchangeFromCurrency,
        exchangeToAmount,
        exchangeToCurrency,
        rates
      },
      currencyAccounts: { currencyAccountBalances }
    }: StoreState
    ) => ({
      fromAmount: exchangeFromAmount,
      fromCurrency: exchangeFromCurrency,
      fromCurrencyAccountBalance: currencyAccountBalances[exchangeFromCurrency] || 0,
      toAmoumnt: exchangeToAmount,
      toCurrency: exchangeToCurrency,
      toCurrencyAccountBalance: currencyAccountBalances[exchangeToCurrency] || 0,
    }),
    shallowEqual
  )

  const dispatch = useDispatch()

  const onExchangeCallback = useCallback(
    ({ target }) => {
      const newFromCurrencyAccountBalance = fromCurrencyAccountBalance - fromAmount;
      const newToCurrencyAccountBalance = toCurrencyAccountBalance + toAmoumnt;
      dispatch(setCurrencyAccountBalance(newFromCurrencyAccountBalance, fromCurrency))
      dispatch(setCurrencyAccountBalance(newToCurrencyAccountBalance, toCurrency))
    },
    [dispatch, fromAmount, fromCurrency, fromCurrencyAccountBalance, toAmoumnt, toCurrency, toCurrencyAccountBalance]
  )

  const disableExchangeSubmit = !fromCurrencyAccountBalance || !fromAmount ||
    fromAmount <= 0 || fromAmount > fromCurrencyAccountBalance

  return (
    <Button
      onClick={onExchangeCallback}
      disabled={disableExchangeSubmit}
    >
      {'Exchange'}
    </Button>
  )
}

export default SubmitExchangeButton

const Button =
  styled.button({
    display: 'block',
    backgroundColor: 'rgb(235, 0, 141)',
    lineHeight: '1.5em',
    fontSize: '1rem',
    'font-weight': '500',
    color: 'white',
    cursor: 'pointer',
    borderRadius: '2em',
    padding: '0.625em 3em',
    margin: '20px auto',
    ":disabled": { opacity: '0.2' }
  })