import React from 'react';
import { userReload } from '../../actions/userAction';


// TODO: どんなユーザーデータを表示するのかを考える
/**
 * ユーザーリストを表示する際の各ユーザーデータを表示する
 * @param {string} props.name ユーザーネーム
 */
const UserData = (props) => {
  return(
    <>
      <p>name:{props.name}</p>
    </>
  )
}

export default UserData;
