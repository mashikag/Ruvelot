import React, { ReactElement, useCallback } from 'react'
import styled from 'styled-components'
import ExchangePocket from './ExchangePocket'
import { Currency, StoreState } from '../../store/types';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setExchangeFromCurrency, setExchangeToCurrency, setExchangeFromAmount, setExchangeToAmount } from '../../store';

const EXCHANGE_FROM_POCKET_LABEL = 'From'
const EXCHANGE_TO_POCKET_LABEL = 'To'

interface ExchangePocktsState {
  exchangeFromAmount: number | null
  exchangeToAmount: number | null
  exchangeFromCurrency: Currency
  exchangeToCurrency: Currency
}

function ExchangePockets(): ReactElement {

  const {
    exchangeFromAmount,
    exchangeToAmount,
    exchangeFromCurrency,
    exchangeToCurrency,
  } = useSelector<StoreState, ExchangePocktsState>(
    ({
      currencyExchange: {
        exchangeFromAmount,
        exchangeFromCurrency,
        exchangeToAmount,
        exchangeToCurrency
      }
    }) => ({
      exchangeFromAmount,
      exchangeToAmount,
      exchangeFromCurrency,
      exchangeToCurrency
    }),
    shallowEqual
  )

  const dispatch = useDispatch();

  const onExchangeFromCurrencyChange = useCallback(
    (currency: Currency) =>
      dispatch(setExchangeFromCurrency(currency)),
    [dispatch]
  )

  const onExchangeToCurrencyChange = useCallback(
    (currency: Currency) =>
      dispatch(setExchangeToCurrency(currency)),
    [dispatch]
  )

  const onExchangeFromAmountChange = useCallback(
    (amount: number | null) =>
      dispatch(setExchangeFromAmount(amount)),
    [dispatch]
  )

  const onExchangeToAmountChange = useCallback(
    (amount: number | null) =>
      dispatch(setExchangeToAmount(amount)),
    [dispatch]
  )

  return (
    <PocketsContainer>
      <ExchangePocket
        amount={exchangeFromAmount}
        currency={exchangeFromCurrency}
        excludeCurrency={exchangeToCurrency}
        label={EXCHANGE_FROM_POCKET_LABEL}
        onAmountChange={onExchangeFromAmountChange}
        onCurrencyChange={onExchangeFromCurrencyChange} />
      <ExchangePocket
        amount={exchangeToAmount}
        currency={exchangeToCurrency}
        excludeCurrency={exchangeFromCurrency}
        label={EXCHANGE_TO_POCKET_LABEL}
        onAmountChange={onExchangeToAmountChange}
        onCurrencyChange={onExchangeToCurrencyChange} />
    </PocketsContainer>
  )
}

export default ExchangePockets

const PocketsContainer = styled.div({
  display: 'flex'
}) 