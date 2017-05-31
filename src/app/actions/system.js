/**
 * Created by chenlingguang on 2017/5/31.
 */
import { System } from './actionTypes';

export function receiveDimensions(dimensions) {
  return {
    type: System.UPDATE_DIMENSIONS,
    dimensions,
  };
}
