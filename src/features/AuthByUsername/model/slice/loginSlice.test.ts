import { LoginSchema } from 'features/AuthByUsername';
import { DeepPartial } from '@reduxjs/toolkit';
import { loginActions, loginReducer } from './loginSlice';

describe('loginSlice.test', () => {
    test('setUsername', () => {
        const state: DeepPartial<LoginSchema> = { username: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername('aaa111'),
        )).toEqual({ username: 'aaa111' });
    });
    test('setPassword', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('xxx'),
        )).toEqual({ password: 'xxx' });
    });
});
