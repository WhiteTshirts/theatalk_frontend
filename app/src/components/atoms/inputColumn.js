import React from 'react';

import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

/**
 * 入力欄
 * @param {string} props.inputName 
 * @param {string} props.inputLabel 入力欄に書いてある文字
 * @param
 */
const InputCreateRoomColumn = (props) => {

  const useStyles = makeStyles((thema) => ({
    textBox: {
      "marginBottom": 10,
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
            />
      }
    </>
  )
};

export default InputCreateRoomColumn;