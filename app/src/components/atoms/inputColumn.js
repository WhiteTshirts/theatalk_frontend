import React from 'react';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

/**
 * 入力欄
 * @param {string} props.inputName 
 * @param {string} props.inputLabel 入力欄に書いてある文字
 * @param {method} props.onChange 変化で発火してほしい関数
 * @param {boolean} props.password パスワード指定
 * @param {string} props.variant variant指定
 */
const InputColumn = (props) => {

  const useStyles = makeStyles((thema) => ({
    textBox: {
      margin: 10,
    }
  }));

  const styles = useStyles();

  return (
    <>
      {
        <TextField
              inputRef={props.inputRef}
              className={styles.textBox}
              name={props.inputName}
              label={props.inputLabel}
              onChange={props.onChange}
              password={props.password}
              variant={props.variant}
            />
      }
    </>
  )
};

export default InputColumn;