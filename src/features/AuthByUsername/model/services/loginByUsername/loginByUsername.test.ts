import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from './loginByUsername';

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true); // мок не только самого модуля, но и его внутренностей. Это нужно для TS

describe('loginByUsername.test', () => {
//     let dispatch: Dispatch
//     let getState: () => StateSchema
//
//     beforeEach(() => {
//         dispatch = jest.fn()
//         getState = jest.fn()
//     })
//
//     test('success login', async  () => {
//         const authValue = {username: '123', id: '1'}
//            mockedAxios.post.mockReturnValue(Promise.resolve({data: authValue}))
//         const action = loginByUsername({username: '123', password: '123'})
//         const result = await action(dispatch, getState, undefined)
//         console.log(result)
//         expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(authValue))
//         expect(dispatch).toHaveBeenCalledTimes(3) // диспатч вызывается 3 раза
//         expect(mockedAxios.post).toHaveBeenCalled()
//         expect(result.meta.requestStatus).toBe('fulfilled')
//         expect(result.payload).toEqual(authValue)
//     });
//
//     test('failure login', async  () => {
//         mockedAxios.post.mockReturnValue(Promise.resolve({status: 403}))
//         const action = loginByUsername({username: '123', password: '123'})
//         const result = await action(dispatch, getState, undefined)
//         console.log(result)
//         expect(dispatch).toHaveBeenCalledTimes(2) // диспатч вызывается 2 раза
//         expect(mockedAxios.post).toHaveBeenCalled()
//         expect(result.meta.requestStatus).toBe('rejected')
//         expect(result.payload).toBe('error')
//     });

    test('success login', async () => {
        const authValue = { username: '123', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: authValue }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(authValue));
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(authValue);
    });
    test('failure login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: '123', password: '123' });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
