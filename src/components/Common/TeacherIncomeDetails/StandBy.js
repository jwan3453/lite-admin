import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import moment from 'moment';

export default class StandBy extends React.Component {
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

    return (
      <div>
        <Row>
          <Col {...leftColProps}>来源:</Col>
          <Col {...rightColProps}>待命</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>日期:</Col>
          <Col {...rightColProps}>{moment(data.from_time).format('YYYY-MM-DD')}</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>待命时间:</Col>
          <Col {...rightColProps}>{moment(data.from).format('HH:mm')} - {moment(data.to).format('HH:mm')}</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>备注:</Col>
          <Col {...rightColProps}>{data.remark}</Col>
        </Row>
      </div>
    );
  }
}

