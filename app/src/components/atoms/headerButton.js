import React from 'react';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

/**
 * クリックされると呼び出し元のformのsubmitを発火させるボタン
 * @param {string} props.msg ボタンのメッセージ名
 * @param {*} props.icon ボタンにつくアイコン　/*hogehogeは改修必要 
 * @param {function} props.handleClick クリックされた時に呼び出す関数
 */
const HeaderButton = (props) => {
  const useStyles = makeStyles(() => ({
    Button: {
      color: 'white',
      backgroundColor: '#F03636',
      cursor: "pointer",
      "font-family": "Helvetica Neue",
      "text-decoration": "none",
      "padding": 7,
      textAligin:"left",
      endIcon: props.icon
    },
  }));

  const styles = useStyles();

  return (
    <>
      <Button className={styles.link} handleClick={props.handleClick} endIcon = {props.icon}>
        {props.msg}
      </Button>
    </>
  )
};

export default HeaderButton;

//HeaderButtonをmoleculeとして、下部のiconとbuttonをAtomsとして、
//material-uiのiconの表現方法が２つあるはず...