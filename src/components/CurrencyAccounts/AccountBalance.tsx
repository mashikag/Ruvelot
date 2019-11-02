import React from 'react';
import { Currency } from '../store/types';

export interface AccountBalanceProps {
  currency: Currency,
  balance: Number
}

const AccountBalance: React.SFC<AccountBalanceProps> =
  ({ balance, currency }) =>
    <div>
      {`${currency} ${balance}`}
    </div>

export default AccountBalance;
