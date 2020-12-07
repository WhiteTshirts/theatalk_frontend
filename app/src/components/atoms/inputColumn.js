import React from 'react';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

/**
 * 入力欄
 * @param {string} props.name 
 * @param {string} props.label 入力欄に書いてある文字
 * @param {boolean} props.isPassword パスワードかどうか
 */
const InputColumn = (props) => {
  const useStyles = makeStyles(() => ({
    textBox: {
      margin: 20
    },
  }));

  const styles = useStyles();

  return (
    <>
      { /* パスワードでない     */
        !props.isPassword &&
        <TextField
              class={styles.textBox}
              name={props.name}
              label={props.label}
              variant="filled"
            />
      }

      { /* パスワードである     */
        props.isPassword &&
        <TextField
              class={styles.textBox}
              name={props.name}
              label={props.label}
              type="password"
              variant="filled"
            />
      }
    </>
  )
};

export default InputColumn;