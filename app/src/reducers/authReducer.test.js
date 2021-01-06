import auth from './authReducer';

import {
  RELOAD_REQUEST, RELOAD_SUCCESS, RELOAD_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
} from '../actions/authAction';

import {
  describe, test, expect,
} from '../test/test-utils';

describe('auth reducer', () => {
  test('should return the initial state', () => {
    expect(auth(undefined, {})).toEqual(
      {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      },
    );
  });

  test('should handle SIGNUP_REQUEST', () => {
    expect(
      auth([], {
        type: SIGNUP_REQUEST,
      }),
    ).toEqual(
      {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      },
    );
  });

  test('should handle SIGNUP_SUCCESS', () => {
    const token = 'token';
    const id = 'id';
    const expectedObject = {
      token,
      id,
      isLoggedIn: true,
      isLoading: false,
      error: null,
    };

    expect(
      auth([], {
        type: SIGNUP_SUCCESS,
        token,
        id,
      }),
    ).toEqual(expectedObject);
  });

  test('should handle SIGNUP_FAILURE', () => {
    const error = 'error';

    expect(
      auth([], {
        type: SIGNUP_FAILURE,
        error,
      }),
    ).toEqual({
      token: null,
      id: null,
      isLoggedIn: false,
      isLoading: false,
      error: error,
    });
  });

  test('should handle LOGIN_REQUEST', () => {
    expect(
      auth([], {
        type: LOGIN_REQUEST,
      }),
    ).toEqual(
      {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      },
    );
  });

  test('should handle LOGIN_SUCCESS', () => {
    const token = 'token';
    const id = 'id';
    const expectedObject = {
      token,
      id,
      isLoggedIn: true,
      isLoading: false,
      error: null,
    };

    expect(
      auth([], {
        type: LOGIN_SUCCESS,
        token,
        id,
      }),
    ).toEqual(expectedObject);
  });

  test('should handle LOGIN_FAILURE', () => {
    const error = 'error';

    expect(
      auth([], {
        type: LOGIN_FAILURE,
        error,
      }),
    ).toEqual({
      token: null,
      id: null,
      isLoggedIn: false,
      isLoading: false,
      error: error,
    });
  });

  test('should handle RELOAD_REQUEST', () => {
    expect(
      auth([], {
        type: RELOAD_REQUEST,
      }),
    ).toEqual(
      {
        token: null,
        id: null,
        isLoggedIn: false,
        isLoading: true,
        error: null,
      },
    );
  });

  test('should handle RELOAD_SUCCESS', () => {
    const token = 'token';
    const id = 'id';
    const expectedObject = {
      token,
      id,
      isLoggedIn: true,
      isLoading: false,
      error: null,
    };

    expect(
      auth([], {
        type: RELOAD_SUCCESS,
        token,
        id,
      }),
    ).toEqual(expectedObject);
  });

  test('should handle RELOAD_FAILURE', () => {
    const error = 'error';

    expect(
      auth([], {
        type: RELOAD_FAILURE,
        error,
      }),
    ).toEqual({
      token: null,
      id: null,
      isLoggedIn: false,
      isLoading: false,
      error,
    });
  });
});
