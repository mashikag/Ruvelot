import React, { ReactElement } from 'react'
import AccountBalance from './AccountBalance'
import AccountSelector from './AccountSelector'

function CurrencyAccounts(): ReactElement<any> {
  return (
    <div>
      <AccountSelector />
      <AccountBalance />
    </div>
  );
}

export default CurrencyAccounts
