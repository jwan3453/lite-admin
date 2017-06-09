import React from 'react';
import {
  Row,
  Col,
} from 'antd';

import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export default class Certificate extends React.Component {
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
          <Col {...rightColProps}>资质认证</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>名称:</Col>
          <Col {...rightColProps}>{data.certification ? data.certification.title : ''}</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>获得时间:</Col>
          <Col {...rightColProps}>{moment(data.start).format(TIME_FORMAT)}</Col>
        </Row>
      </div>
    );
  }
}

