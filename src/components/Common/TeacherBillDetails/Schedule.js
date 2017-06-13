import React from 'react';
import {
  Row,
  Col,
} from 'antd';
import moment from 'moment';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export default class Schedule extends React.Component {
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
    const { course } = data;
    const { lesson } = course;

    return (
      <div>
        <Row>
          <Col {...leftColProps}>来源:</Col>
          <Col {...rightColProps}>上课</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>课程:</Col>
          <Col {...rightColProps}>{course.name} {lesson.name}</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>上课时间:</Col>
          <Col {...rightColProps}>{lesson.begin_at ? moment(lesson.begin_at).format(TIME_FORMAT) : ''}</Col>
        </Row>
      </div>
    );
  }
}

