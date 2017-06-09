import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import _ from 'lodash';
import * as BONUS_TYPE from '../../../../../common/bonusTypes';

export default class Bonus extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
  };

  static defaultProps = {
    data: {},
  };

  render() {
    const leftColProps = {
      span: 8,
      style: { textAlign: 'right' },
    };

    const rightColProps = {
      span: 15,
      offset: 1,
    };

    const { data } = this.props;
    const { bonus } = data;
    const currentType = _.filter(
      BONUS_TYPE.TYPES
      , item => item.value === bonus.type)[0];

    return (
      <div>
        <Row>
          <Col {...leftColProps}>来源:</Col>
          <Col {...rightColProps}>奖金</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>奖金类型:</Col>
          <Col {...rightColProps}>{currentType.text}</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>备注:</Col>
          <Col {...rightColProps}>{bonus.comment}</Col>
        </Row>
      </div>
    );
  }
}

