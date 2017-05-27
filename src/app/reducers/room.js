import { assign } from 'lodash';
import moment from 'moment';
import { Rooms, Room, RoomTypes } from '../actions/actionTypes';

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
      return assign({}, state, {
        loading: true,
      });
    case RoomTypes.FETCH:
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
    case RoomTypes.FETCH_FAIL:
    case Room.FETCH_FAIL:
    case Rooms.FETCH_FAIL:
      return assign({}, state, {
        loading: false,
      });
    default:
      return state;
  }
}
