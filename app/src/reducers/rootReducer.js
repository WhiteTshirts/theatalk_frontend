import { combineReducers } from 'redux';
import rooms from './roomsReducer';
import room from './roomReducer';
import auth from './authReducer';
import createRoom from './createRoomReducer';
import tags from './tagReducer';
import user from './userReducer';
import users from './usersReducer';
import userTags from './userTagReducer';
import chat from './chatReducer';
import searchedRoom from './searchedRoomsReducer';

const rootReducer = combineReducers({
  rooms,
  room,
  auth,
  createRoom,
  tags,
  user,
  users,
  userTags,
  chat,
  searchedRoom,
});

export default rootReducer;
