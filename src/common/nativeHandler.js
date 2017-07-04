import { Modal } from 'antd';
import auth from './auth';

const { window } = global;
const { JQCall: jQInvoke } = window;

function invoke(...args) {
  // bridge accept string param only.
  const stringifiedArgs = args.map(String);

  return new Promise((resolve, reject) => {
    function delegate(code, result) {
      if (code) {
        reject(result);
      } else {
        resolve(result);
      }
    }
    const promiseArgs = [...stringifiedArgs, delegate];

    jQInvoke(...promiseArgs);
  });
}

function nativeEnterClassroom(roomId, practice = false) {
  Promise.all([
    invoke('RoomService.SetConfigArgs', 'token', auth.getAccessToken()),
    invoke('RoomService.SetConfigArgs', 'roomId', roomId),
    // convert to 0/1
    invoke('RoomService.SetConfigArgs', 'practice', Number(practice)),
    invoke('RoomService.SetConfigArgs', 'mode', 'master'),
  ]).then(() => invoke('RoomService.EnterRoom'));
}

function enterClassRoom(roomId, practice = false) {
  if (typeof jQInvoke !== 'undefined') {
    nativeEnterClassroom(roomId, practice);
  } else {
    Modal.warning({
      title: 'Warning',
      content: 'You are not in native mode. CAN NOT enter classroom.',
      okText: 'OK',
    });
  }
}

export default {
  enterClassRoom,
};
