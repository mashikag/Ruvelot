import { Currency } from '../../shared/types';
import { selectCurrencyAccount, setCurrencyAccountBalance } from '../actions';
import { SELECT_CURRENCY_ACCOUNT, SET_CURRENCY_ACCOUNT_BALANCE } from '../types';

describe('actions', () => {
    it(
        'should create an action to select given currency account',
        () => {
            const currency = 'PLN';
            const expectedAction = {
                type: SELECT_CURRENCY_ACCOUNT,
                currency
            };
            expect(selectCurrencyAccount(currency)).toEqual(expectedAction);
        }
    );

    it(
        'should create an action to set currency account balance',
        () => {
            const currency = 'EUR';
            const balance = 990;
            const expectedAction = {
                type: SET_CURRENCY_ACCOUNT_BALANCE,
                balance,
                currency
            };
            expect(setCurrencyAccountBalance(balance, currency)).toEqual(expectedAction);
        }
    );
})