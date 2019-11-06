import React, { ReactElement, useCallback, HTMLAttributes } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { swtichExchangeCurrencies } from '../../store'

function SwitchExchangeCurrencies(): ReactElement {
  const dispatch = useDispatch()
  const switchCurrenciesCallback = useCallback(
    () => dispatch(swtichExchangeCurrencies()),
    [dispatch]
  )
  return (
    <Button className={'glyphicon glyphicon-refresh'} onClick={switchCurrenciesCallback}>
    </Button>
  )
}

export default SwitchExchangeCurrencies

const Button = styled.button({
  color: 'white',
  backgroundColor: '#0075eb',
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50px',
  height: '50px',
  borderRadius: '25px',
  fontSize: '20px',
  fontWeight: 'bold',
  ':focus': {
    boxShadow: '0 0 3pt 2pt blue',
    outline: 'none'
  },
})