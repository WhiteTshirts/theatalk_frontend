import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import BasicButton from '../atoms/basicButton';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import { login } from '../../actions/authAction';
import Alert from '@material-ui/lab/Alert';
import InputColumn from '../atoms/inputColumn';

const useStyles = makeStyles(() => ({
  formSpace: {
    margin: 'auto',
    width: 300,
    padding: 20,
    justify: 'center',
    textAlign: 'center',
  },
}));

const errorSelector = (state) => state.auth.login_error;

const Signin = () => {
  const classes = useStyles();
  const [msg, setMsg] = useState('');
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const err = useSelector(errorSelector);

  /**
   * フォームのログインボタンがクリックされた際に発火する
   * フォームに入力された内容を用いてログイン処理を行う
   * @param {Object} data - 入力されたデータ
   * @param {string} data.name - ユーザー名
   * @param {string} data.password - パスワード
   */
  const Submit = (data) => {
    const user = JSON.stringify({
      user: {
        name: data.name,
        password: data.password,
      },
    });
    if (data.name === '') {
      setMsg('ユーザー名が入力されていません');
    } else if (data.password === '') {
      setMsg('パスワードが入力されていません');
    } else {
      setMsg('');
      // jsonデータに変形してから投げる
      dispatch(login(user, history));
    }
  };

  return (
    <div>
      <Paper className={classes.formSpace} elevation={5}>
        <AccountCircle fontSize="large" />
        <h2>ログイン</h2>
        {(() => {
          if (err !== null && err !== undefined) {
            return (
              <div>
                <Alert severity="error"> <strong> ユーザー名またはパスワードが違います</strong> </Alert>
              </div>
            );
          }else if(msg !== ""){
            return (
              <div>
                <Alert severity="error"> <strong> { msg } </strong> </Alert>
              </div>
            );
          }
        })()}

        <form onSubmit={handleSubmit(Submit)}>
          <div>
            <InputColumn inputRef={register} inputName="name" inputLabel="ユーザー名" variant="filled" margin={10} />
          </div>
          <div>
            <InputColumn inputRef={register} inputName="password" inputLabel="パスワード" password="password" variant="filled" margin={10} />
          </div>
          <div>
            <BasicButton msg="ログイン" backgroundColor="#F03636" onForm={true} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default Signin;
