import React from 'react';
import CurrencyAccountsContainer from './containers/CurrencyAccounts';
import CurrencyExchangeContainer from './containers/CurrencyExchange';

const App: React.SFC = () =>
  <div>
    <CurrencyAccountsContainer
      selectedCurrencyAccount={"USD"}
      currencyAccountsBalance={{}} />
    <CurrencyExchangeContainer
      baseExchangeCurrency={"USD"}
      exchangeFromCurrency={"USD"}
      exchangeToCurrency={"USD"}
      exchangeRates={{}}
      fetchExchangeRatesState={{ isFetching: false }} />
  </div>

export default App;
