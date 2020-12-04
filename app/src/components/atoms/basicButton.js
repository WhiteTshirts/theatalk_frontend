import React from 'react';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 * クリックされると呼び出し元のformのsubmitを発火させるボタン
 * @param {string} props.msg ボタンのメッセージ名
 * @param {string} props.backgroundColor ボタンの背景色(CSS)
 * @param {boolean} props.onForm formに紐付いたsubmitButtonかどうか
 * @param {function} props.handleClick クリックされた時に呼び出す関数
 */
const BasicButton = (props) => {
  const useStyles = makeStyles(() => ({
    button: {
      color: 'white',
      backgroundColor: props.backgroundColor,
    },
  }));

  const styles = useStyles();

  return (
    <>
      { /* formに紐付いている場合     */
        props.onForm &&
        <Button className={styles.button} type="submit" variant="contained">
          {props.msg}
        </Button>
      }

      { /* formに紐付いていない場合  */
        !props.onForm &&
        <Button className={styles.button} onClick={props.handleClick} variant="contained">
          {props.msg}
        </Button>
      }
    </>
  )
};

export default BasicButton;