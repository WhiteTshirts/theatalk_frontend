import React from 'react';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

/**
 * 入力欄
 * @param {string} props.inputName 
 * @param {string} props.inputLabel 入力欄に書いてある文字
 * @param {boolean} props.isPassword パスワードかどうか
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
      { /* パスワードでない     */
        !props.isPassword &&
        <TextField
              inputRef={props.inputRef}
              className={styles.textBox}
              name={props.inputName}
              label={props.inputLabel}
              variant="filled"
            />
      }

      { /* パスワードである     */
        props.isPassword &&
        <TextField
              inputRef={props.inputRef}
              className={styles.textBox}
              name={props.inputName}
              label={props.inputLabel}
              type="password"
              variant="filled"
            />
      }
    </>
  )
};

export default InputColumn;