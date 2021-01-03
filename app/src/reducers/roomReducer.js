import {
  SET_ROOM, ENTER_ROOM_REQUEST, ENTER_ROOM_SUCCESS, ENTER_ROOM_FAILURE,
  EXIST_ROOM_REQUEST, EXIST_ROOM_SUCCESS, EXIST_ROOM_FAILURE,
} from '../actions/roomAction';

const initalState = {
  room: {},
  ws: null,
  chats: [],
  isLoading: false,
  error: null,
};

const room = (state = initalState, action) => {
  switch (action.type) {
    case SET_ROOM:
      return {
        room: action.room,
        ws: action.ws,
        chats: action.chats,
        isLoading: initalState.isLoading,
        error: initalState.error,
      };
    case ENTER_ROOM_REQUEST:
      return {
        room: initalState.room,
        ws: initalState.ws,
        chats: initalState.chats,
        isLoading: true,
        error: initalState.error,
      };
    case ENTER_ROOM_SUCCESS:
      return {
        room: action.room,
        ws: action.ws,
        chats: action.chats,
        isLoading: initalState.isLoading,
        error: initalState.error,
      };
    case ENTER_ROOM_FAILURE:
      return {
        room: initalState.room,
        ws: initalState.ws,
        chats: initalState.chats,
        isLoading: initalState.isLoading,
        error: action.error,
      };
    case EXIST_ROOM_REQUEST:
      return {
        room: state.room,
        ws: state.ws,
        chats: state.chats,
        isLoading: true,
        error: state.error,
      };
    case EXIST_ROOM_SUCCESS:
      return initalState
    case EXIST_ROOM_FAILURE:
      return {
        room: state.room,
        ws: state.ws,
        chats: state.chats,
        isLoading: initalState.isLoading,
        error: action.error,
      };
    default:
      return state;
  }
};

export default room;
