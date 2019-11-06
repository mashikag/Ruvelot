import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import AccountBalance from './AccountBalance'
import AccountSelect from './AccountSelect'

function CurrencyAccounts(): ReactElement<any> {
  return (
    <AccountBalanceContainer>
      <CurrencyAccountContainer>
        <AccountBalance />
        <AccountSelect />
      </CurrencyAccountContainer>
      <AccountHeader />
    </AccountBalanceContainer>
  )
}

export default CurrencyAccounts


const AccountHeader =
  styled.header<HTMLAttributes<HTMLElement>>({
    color: 'gray',
    fontSize: '1.1em',
    lineHeight: '1.8em',
    ":after": {
      content: '"Account Balance"'
    }
  })

const AccountBalanceContainer =
  styled.div<HTMLAttributes<HTMLDivElement>>({
    width: '100%',
    textAlign: 'center',
    marginBottom: '20px'
  })

const CurrencyAccountContainer =
  styled.div<HTMLAttributes<HTMLDivElement>>({
    display: 'flux',
    fluxFlow: 'row nowrap',
    justifyContent: 'center'
  })
