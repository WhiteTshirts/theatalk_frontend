import React from 'react';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 * クリックされると呼び出し元のformのsubmitを発火させるボタン
 * @param {string} props.msg ボタンのメッセージ名
 * @param {string} props.backgroundColor ボタンの背景色(CSS)
 */
const SubmitButton = (props) => {
  const useStyles = makeStyles(() => ({
    button: {
      color: 'white',
      backgroundColor: props.backgroundColor,
    },
  }));

  const styles = useStyles();

  return (
    <>
      <Button className={styles.button} type="submit">
        {props.msg}
      </Button>
    </>
  )
};

export default SubmitButton;