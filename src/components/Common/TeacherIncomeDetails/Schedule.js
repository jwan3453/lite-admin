import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import { fetchCourses } from '../../../app/actions/course';

const TIME_FORMAT = 'YYYY-MM-DD HH:mm';

class Schedule extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    courses: React.PropTypes.array,
    coursesLoaded: React.PropTypes.bool,
    dispatch: React.PropTypes.func.isRequired,

  };

  static defaultProps = {
    data: {},
    courses: [],
    coursesLoaded: false,
  };

  componentWillMount() {
    const {
      dispatch,
      coursesLoaded,
    } = this.props;
    if (!coursesLoaded) dispatch(fetchCourses());
  }

  getLessonShortName = (lessonId) => {
    const { courses } = this.props;
    let lesson = {};
    let course = {};
    courses.map((aCourse) => {
      if (_.isArray(aCourse.chapters)) {
        aCourse.chapters.map((chapter) => {
          if (_.isEmpty(lesson) && _.isArray(chapter.lessons)) {
            lesson = _.find(chapter.lessons, { id: lessonId });
            course = aCourse;
          }
          return null;
        });
      }
      return null;
    });

    let name = course.id;
    if (course.name) {
      name = course.name;
      const match = /^.*(L\d).*$/.exec(course.name);
      if (match[1]) {
        name = match[1];
      }
    }
    return `${name}-${lesson.name || lessonId}`;
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
          <Col {...rightColProps}>上课</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>课程:</Col>
          <Col {...rightColProps}>{this.getLessonShortName(data.lessonId)}</Col>
        </Row>
        <Row>
          <Col {...leftColProps}>上课时间:</Col>
          <Col {...rightColProps}>{data.scheduleTime ? moment.unix(data.scheduleTime).format(TIME_FORMAT) : ''}</Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { course } = state;
  return {
    courseLoaded: course.loaded,
    courses: course.courses,
  };
}

export default connect(mapStateToProps)(Schedule);

