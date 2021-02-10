import axios from '../settings/axios';

export const GET_ROOMS_REQUEST = 'GET_ROOMS_REQUEST';
export const getRoomsRequest = () => ({
  type: GET_ROOMS_REQUEST,
});

export const GET_ROOMS_SUCCESS = 'GET_ROOMS_SUCCESS';
export const getRoomsSuccess = (json) => ({
  type: GET_ROOMS_SUCCESS,
  rooms: json,
  receivedAt: Date.now(),
});

export const GET_ROOMS_FAILURE = 'GET_ROOMS_FAILURE';
export const getRoomsFailure = (error) => ({
  type: GET_ROOMS_FAILURE,
  error,
});

export const ENTER_ROOM_REQUEST = 'ENTER_ROOM_REQUEST';
export const enterRoomRequest = () => ({
  type: ENTER_ROOM_REQUEST,
});

export const ENTER_ROOM_SUCCESS = 'ENTER_ROOM_SUCCESS';
export const enterRoomSuccess = (room, ws, chats) => ({
  type: ENTER_ROOM_SUCCESS,
  room,
  ws,
  chats,
});

export const ENTER_ROOM_FAILURE = 'ENTER_ROOM_FAILURE';
export const enterRoomFailure = (error) => ({
  type: ENTER_ROOM_FAILURE,
  error,
})

export const EXIST_ROOM_REQUEST = 'EXIST_ROOM_REQUEST';
export const existRoomRequest = () => ({
  type: EXIST_ROOM_REQUEST,
});

export const EXIST_ROOM_SUCCESS = 'EXIST_ROOM_SUCCESS';
export const existRoomSuccess = () => ({
  type: EXIST_ROOM_SUCCESS,
});

export const EXIST_ROOM_FAILURE = 'EXIST_ROOM_FAILURE';
export const existRoomFailure = (error) => ({
  type: EXIST_ROOM_FAILURE,
  error,
})

export const SET_ROOM = 'SET_ROOM';
export const setRoom = (room, ws, chats) => ({
  type: SET_ROOM,
  room,
  ws,
  chats,
});

export const SEARCH_ROOMS_REQUEST = 'SEARCH_ROOMS_REQUEST';
export const searchRoomsRequest = () => ({
  type: SEARCH_ROOMS_REQUEST,
});

export const SEARCH_ROOMS_SUCCESS = 'SEARCH_ROOMS_SUCCESS';
export const searchRoomsSuccess = (rooms) => ({
  type: SEARCH_ROOMS_SUCCESS,
  rooms: rooms,
  receivedAt: Date.now(),
});

export const SEARCH_ROOMS_FAILURE = 'SEARCH_ROOMS_FAILURE';
export const searchRoomsFailure = (error) => ({
  type: SEARCH_ROOMS_FAILURE,
  error,
});

export const enterRoom = (history, room) => (dispatch, getState) => {
  const store = getState();
  dispatch(enterRoomRequest());
  const id = JSON.stringify({
    user: {
      room_id: room.id
    }
  });
  return axios.post('http://localhost:5000/api/v1/room_users', id, {
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then((res) => {
      // TODO: chatを開始する
      dispatch(enterRoomSuccess(room, undefined, undefined));
      localStorage.setItem('room', JSON.stringify(room));
    })
    .catch((err) => dispatch(getRoomsFailure(err)))
    .then(() => history.push(`/rooms/${room.id}`))
    .catch((err) => dispatch(getRoomsFailure(err)))
};

export const exitRoom = () => (dispatch, getState) => {
  const store = getState();
  dispatch(existRoomRequest());
  return axios.get('http://localhost:5000/api/v1/room_users/leave', {
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then((res) => {
      dispatch(existRoomSuccess());
    })
    .catch((err) => dispatch(existRoomFailure(err)));
}

export const getRooms = (token) => (dispatch) => {
  dispatch(getRoomsRequest());
  return axios.get('http://localhost:5000/api/v1/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch(getRoomsSuccess(res.data.rooms))
    })
    .catch((err) => dispatch(getRoomsFailure(err)));
};

/**
 * 画面がリロードされた際に、localstrageからルーム情報を取得する
 */
export const roomReload = () => (dispatch) => {
  const room = JSON.parse(localStorage.getItem('room'));
  dispatch(setRoom(room))
};

/**
 * 特定のタグを持つルームを検索する
 */
export const searchRooms = (tag_id) => (dispatch, getState) => {
  const store = getState();
  dispatch(searchRoomsRequest());
  return axios.get(`http://localhost:5000/api/v1/room_tags/${tag_id}`, {
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then((res) => {
      dispatch(searchRoomsSuccess(res.data.rooms))
    }).catch((err) => searchRoomsFailure(err));
};

export const searchUserRooms = () => (dispatch, getState) => {
  const store = getState();
  dispatch(searchRoomsRequest());
  return axios.get(`http://localhost:5000/api/v1/user_room_tags/${store.auth.id}`, {
    headers: {
      Authorization: `Bearer ${store.auth.token}`,
    },
  })
    .then((res) => {
      dispatch(searchRoomsSuccess(res.data.room))
    }).catch((err) => searchRoomsFailure(err));
};