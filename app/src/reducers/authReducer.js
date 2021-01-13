import {
  RELOAD_REQUEST, RELOAD_SUCCESS, RELOAD_FAILURE,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT, // Hiranuma
} from '../actions/authAction';

const initialState = {
  token: null,
  id: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        token: initialState.token,
        id: initialState.id,
        isLoggedIn: initialState.isLoggedIn,
        isLoading: true,
        error: initialState.error,
      };
    case SIGNUP_SUCCESS:
      return {
        token: action.token,
        id: action.id,
        isLoggedIn: true,
        isLoading: initialState.isLoading,
        error: initialState.error,
      };
    case SIGNUP_FAILURE:
      return {
        token: initialState.token,
        id: initialState.id,
        isLoggedIn: initialState.isLoggedIn,
        isLoading: initialState.isLoading,
        error: action.error,
      };
    case LOGIN_REQUEST:
      return {
        token: initialState.token,
        id: initialState.id,
        isLoggedIn: initialState.isLoggedIn,
        isLoading: true,
        error: initialState.error,
      };
    case LOGIN_SUCCESS:
      return {
        token: action.token,
        id: action.id,
        isLoggedIn: true,
        isLoading: initialState.isLoading,
        error: initialState.error,
      };
    case LOGIN_FAILURE:
      return {
        token: initialState.token,
        id: initialState.id,
        isLoggedIn: initialState.isLoggedIn,
        isLoading: initialState.isLoading,
        error: action.error,
      };
    case RELOAD_REQUEST:
      return {
        token: initialState.token,
        id: initialState.id,
        isLoggedIn: initialState.isLoggedIn,
        isLoading: true,
        error: initialState.error,
      };
    case RELOAD_SUCCESS:
      return {
        token: action.token,
        id: action.id,
        isLoggedIn: true,
        isLoading: initialState.isLoading,
        error: initialState.error,
      };
    case RELOAD_FAILURE:
      return {
        token: initialState.token,
        id: initialState.id,
        isLoggedIn: initialState.isLoggedIn,
        isLoading: initialState.isLoading,
        error: action.error,
      };
      //Hiranuma
    case LOGOUT:
      return initialState
    default:
      return state;
  }
};

export default auth;
