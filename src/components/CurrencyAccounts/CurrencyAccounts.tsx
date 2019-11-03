import React from 'react'
import AccountBalance from './AccountBalance'
import AccountNavigation from './AccountNavigation'
import AccountSelector from './AccountSelector'

const CurrencyAccounts: React.SFC<any> =
  () =>
    <div>
      <AccountSelector />
      <AccountBalance />
      <AccountNavigation />
    </div>

export default CurrencyAccounts
