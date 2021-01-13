import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

import TheatersIcon from '@material-ui/icons/Theaters';
import { makeStyles } from '@material-ui/core/styles';
import { getRooms } from '../../actions/roomAction';
import { openRoomDialog, closeRoomDialog, createRoom } from '../../actions/createRoomAction';
import InputColumn from '../atoms/inputColumn';

import Alert from '@material-ui/lab/Alert';

import axios from 'axios';

const useStyles = makeStyles(() => ({
  tagCard: {
    margin: 10,
    width: 150,
  },

  switchPosition: {
    'text-align': 'center',
  },

  button: {
    color: 'white',
    backgroundColor: '',
  },

  roomButton: {
    height: 50,
    width: 130,
    color: '#800000',
    backgroundColor: "white",
  }
}));

const createRoomSelector = (state) => state.createRoom;
const tokenSelector = (state) => state.auth.token;
// TODO: 実際のAPIを叩く時にidの情報は不要なので削除
const roomSelector = (state) => state.rooms;

const API_KEY = 'AIzaSyCkRx3OW3jIOosKQNBb8uzkVxyvlVQhbN0'

const CreateRoomDialog = () => {
  const classes = useStyles();
  const createRoomProps = useSelector(createRoomSelector);
  const token = useSelector(tokenSelector);
  const history = useHistory();

  // TODO: 実際のAPIを叩く時にidの情報は不要なので削除
  const rooms = useSelector(roomSelector);

  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  // 動画ルームを非公開にするかどうか
  const [isPrivate, setIsPrivate] = useState(false);
  const [msg, setMsg] = useState("");
  // 開始時間
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [url, setUrl] = useState('');
  const [thumnail, setThumnail] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    axios.get(url)
      .then(res => res.data.items[0].snippet)
      .catch(() => console.log('YouTubeAPI Error'))
      .then(res1 => setTitle(res1.title))
      .then(res2 => setUrl(res2.thumbnails.default.url))
  }, [url]);

  const handleOpen = () => {
    dispatch(openRoomDialog());
  };

  const handleClose = () => {
    dispatch(closeRoomDialog());
    setThumnail('');
    setTitle('');
  };

  const handleIsPrivateChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleVideoInfo = (e) => {
    const id = e.target.value.match(/[\/?=]([a-zA-Z0-9_\-]{11})[&\?]?/)[1];
    setUrl(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet&fields=items(snippet(title,thumbnails.default))`);
    setThumnail(`http://img.youtube.com/vi/${id}/default.jpg`)
  };

  const Submit = (data) => {
    const url = "https://www.youtube.com/watch?v=";
    const another_url = "https://youtu.be/"
    let videoId;
    if (!data.youtube_id.indexOf(url)) {
      videoId = data.youtube_id.match(/[\/?=]([a-zA-Z0-9_\-]{11})[&\?]?/)[1];
    } else if(!data.youtube_id.indexOf(another_url)) {
      videoId = data.youtube_id.substr(-11);
    } else {
      videoId = "";
    }
    // TODO: 実際のAPIを叩く時にidの情報は不要なので削除
    const roomData = JSON.stringify({
      room: {
        name: data.name,
        youtube_id: videoId,
        is_private: isPrivate,
        start_time: selectedDate,
      },
    });
    if (data.name === "") {
      setMsg('ルーム名が入力されていません');
      reset();
    } else if (videoId === "") {
      setMsg('動画のURLに従っていません');
      reset();
    }
    else if (videoId === null) {
      setMsg('URLが入力されていません');
      reset();
    } else {
      setMsg('');
      dispatch(createRoom(token, roomData, history));
      dispatch(getRooms(token));
      handleClose();
    }
    //次回ルーム作成時に表示されないように初期化
    setThumnail('');
    setTitle('');
  };

  return (
    <div>
      <Button onClick={handleOpen} className={classes.roomButton}>
        ルーム作成<TheatersIcon fontSize="large" />
      </Button>
      <Dialog
        open={createRoomProps.is_opened}
        fullWidth
        maxWidth="xs"
        onClose={handleClose}
      >
        <DialogTitle><strong>Create Room</strong></DialogTitle>
        {(() => {
          if (createRoomProps.err !== null && createRoomProps.err !== undefined) {
            return (
              <div>
                <Alert severity="error"> ルームはすでに存在しています<strong></strong> </Alert>
              </div>
            );
          }
          else if (msg !== "") {
            return (
              <div>
                <Alert severity="error"> {msg}<strong></strong> </Alert>
              </div>
            );
          }
        })()}
        <div align="center" style={{fontFamily:"Arial,sans-serif,Roboto", marginLeft:"30pt", marginRight:"30pt"}}>
          <img src={thumnail}/>
          <p>{title}</p>
        </div>
        <form onSubmit={handleSubmit(Submit)}>
          <DialogContent>
            <div>
              <InputColumn inputRef={register} inputName="name" inputLabel="ルーム名" />
            </div>
            <div>
              <InputColumn inputRef={register} inputName="youtube_id" inputLabel="youtube URL" onChange={handleVideoInfo} />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker label="開始時間" value={selectedDate} handleChange={handleDateChange} disablePast ampm={false} />
              </MuiPickersUtilsProvider>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">Cancel</Button>
            <Button type="submit" variant="contained" color="secondary">
              Done
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CreateRoomDialog;
