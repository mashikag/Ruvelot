import { Currency, ExchangeRates } from '../store/types'

export function calcExchangedAmount(
  amount: number | null,
  currency: Currency,
  toCurrency: Currency,
  rates: ExchangeRates,
  base: Currency
): number | null {
  if (amount === null) {
    return null
  }

  if (!rates[currency] || !rates[toCurrency]) {
    throw new Error('At least one of the specified currencies has no corresponding exchange rate value.')
  }

  let baseCurrencyAmount;
  if (currency !== base) {
    // @ts-ignore - ignoring possibly undefined warning - already ensured the rate is defined
    baseCurrencyAmount = amount / rates[currency]
  } else {
    baseCurrencyAmount = amount
  }

  // @ts-ignore - ignoring possibly undefined warning - already ensured the rate is defined
  return safeAmount(baseCurrencyAmount * rates[toCurrency])
}

export function safeAmount(amount: number | string): number {
  let safeNumber: number;
  if (typeof amount === 'string') {
    amount.replace('-', '')
    safeNumber = parseFloat(parseFloat(amount).toFixed(2))
  } else {
    safeNumber = parseFloat(amount.toFixed(2))
  }
  return Math.abs(safeNumber)
}