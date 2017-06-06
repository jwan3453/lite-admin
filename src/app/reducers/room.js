import { assign } from 'lodash';
import moment from 'moment';
import { Rooms, Room, RoomTypes, StudentAppointment, TeacherAppointment } from '../actions/actionTypes';

export function room(
  state = {
    loading: false,
    filters: {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    },
    roomTypes: [],
    rooms: [],
    roomInfo: {},
  },
  action = {},
) {
  switch (action.type) {
    case Rooms.FETCH:
      return assign({}, state, {
        loading: true,
        filters: action.filters,
      });
    case Room.FETCH:
    case Room.ADD_STUDENT:
    case RoomTypes.FETCH:
    case TeacherAppointment.UPDATE:
    case StudentAppointment.UPDATE:
    case StudentAppointment.CHANGE_ROOM:
      return assign({}, state, {
        loading: true,
      });
    case RoomTypes.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        roomTypes: action.response,
      });
    case Room.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        roomInfo: action.response,
      });
    case Rooms.FETCH_SUCCESS:
      return assign({}, state, {
        loading: false,
        rooms: action.response,
      });
    case Room.ADD_STUDENT_SUCCESS:
    case TeacherAppointment.UPDATE_SUCCESS:
    case StudentAppointment.UPDATE_SUCCESS:
    case Room.ADD_STUDENT_FAIL:
    case RoomTypes.FETCH_FAIL:
    case Room.FETCH_FAIL:
    case Rooms.FETCH_FAIL:
    case TeacherAppointment.UPDATE_FAIL:
    case StudentAppointment.UPDATE_FAIL:
    case StudentAppointment.CHANGE_ROOM_SUCCESS:
    case StudentAppointment.CHANGE_ROOM_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
