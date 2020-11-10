/**
 * Author: Hiranuma Tomoyuki
 * Date: 20200908
 */

import React from 'react';
import BasicButton from '../atoms/basicButton';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AuthSelector } from '../header';

const useStyles = makeStyles(() => ({
  root: {
    margin: 'auto',
    height: 800,
    "padding-top": 20,
    justify: 'center',
    textAlign: 'center',
    "font-size": 20,
  },
  image: {
    "background": `url(${window.location.origin}/images/image.png)`,
    "background-size": "contain",
  },
  buttonSignUp: {
    color: 'white',
    backgroundColor: '#F03636',
    margin: 8,
  },
  buttonLogin: {
    color: 'white',
    backgroundColor: "gray",
    margin: 8,
  },
}));

const Toppage = () => {
  const classes = useStyles();
  const history = useHistory();

  const moveSignupPage = () => {
    history.push('/signup');
  };

  const moveLoginPage = () => {
    history.push('/login');
  };

  return (
    <div className={classes.image}>
      <div  className={classes.root}>
        <div>
          <h2>「好み」でつながるコミュニケーションツール</h2>
          <h1>TheaTalk</h1>
        </div>
        {/* TODO: ボタンをクリックされた時に関数呼び出しが出来ないバグを潰す */}
        {/* TODO: ボタンの距離を離すcssコードをdivタグに付ける */}
        <div>
          <BasicButton msg="Sign up" backgroundColor="#F03636" onForm={false} handleClick={() => moveSignupPage} />
        </div>
        <div>
          <BasicButton msg="Login" backgroundColor="gray" onForm={false} handleClick={() => moveLoginPage} />
        </div>
      </div>
    </div>
  );
};
export default Toppage;
