import reducer from "../reducers";
import { CurrencyAccountsState, CurrencyAccountActionTypes, SET_CURRENCY_ACCOUNT_BALANCE, SELECT_CURRENCY_ACCOUNT } from "../types";
import { Currency } from "../../shared/types";
describe('currency accounts reducer', () => {
    it('should return the initial state if state undefined and action not declared', () => {
        // @ts-ignore
        expect(reducer(undefined, {})).toEqual({
            selectedCurrencyAccount: "EUR",
            currencyAccountsBalance: {
                "EUR": 0
            }
        })
    })

    it('should return the input state if action not declared', () => {
        const stateIn: CurrencyAccountsState = {
            selectedCurrencyAccount: "USD",
            currencyAccountsBalance: {
                "EUR": 0,
                "USD": 43
            }
        }
        // @ts-ignore
        const action: CurrencyAccountActionTypes = {};
        const stateOut = reducer(stateIn, action);
        expect(stateOut).not.toBe(stateIn)
        expect(stateOut).toEqual(stateIn)
    })

    it('should return specified currency account set to given balance', () => {
        const stateIn: CurrencyAccountsState = {
            selectedCurrencyAccount: "USD",
            currencyAccountsBalance: {
                "EUR": 0,
                "USD": 43
            }
        }
        const balance = 250.14;
        const accountCurrency: Currency = "GBP"
        const action: CurrencyAccountActionTypes = {
            type: SET_CURRENCY_ACCOUNT_BALANCE,
            balance,
            currency: accountCurrency
        };
        const expectedStateOut = {
            selectedCurrencyAccount: "USD",
            currencyAccountsBalance: {
                "EUR": 0,
                "USD": 43,
                [accountCurrency]: balance
            }
        };
        const stateOut = reducer(stateIn, action);
        expect(stateOut).not.toBe(stateIn)
        expect(stateIn.currencyAccountsBalance).not.toBe(stateOut.currencyAccountsBalance)
        expect(stateOut).toEqual(expectedStateOut)
    })

    it('should return the specified currency account as selected', () => {
        const stateIn: CurrencyAccountsState = {
            selectedCurrencyAccount: "USD",
            currencyAccountsBalance: {
                "EUR": 0,
                "USD": 43
            }
        }
        const currency: Currency = "PLN"
        const action: CurrencyAccountActionTypes = {
            type: SELECT_CURRENCY_ACCOUNT,
            currency
        };
        const expectedStateOut: CurrencyAccountsState = {
            selectedCurrencyAccount: currency,
            currencyAccountsBalance: {
                "EUR": 0,
                "USD": 43
            }
        }
        const stateOut = reducer(stateIn, action);
        expect(stateOut).not.toBe(stateIn)
        expect(stateOut).toEqual(expectedStateOut)
    })
})