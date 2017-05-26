import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Icon } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import './index.less';

import { fetchRooms, fetchRoomTypes } from '../../../app/actions/room';
import { fetchCourses } from '../../../app/actions/course';
import { createSchedule } from '../../../app/actions/schedule';
import { fetchTeachers } from '../../../app/actions/teacher';

import SearchForm from './SearchForm';

class ScheduleCalendar extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    filters: React.PropTypes.object,
    courses: React.PropTypes.array,
    roomTypes: React.PropTypes.array,
    rooms: React.PropTypes.array,
    teachers: React.PropTypes.array,
    coursesLoaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    filters: {},
    courses: [],
    rooms: [],
    roomTypes: [],
    teachers: [],
  };
  state = {
    width: 0,
    height: 0,
  };

  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    global.window.addEventListener('resize', this.updateDimensions);
    const { dispatch, filters, coursesLoaded } = this.props;
    if (!coursesLoaded) dispatch(fetchCourses());
    dispatch(fetchRoomTypes());
    dispatch(fetchRooms(filters));
    dispatch(fetchTeachers());
  }
  componentWillUnmount() {
    global.window.removeEventListener('resize', this.updateDimensions);
  }

  getLessonShortName = (courseId, lessonId) => {
    const { courses } = this.props;
    const course = _.find(courses, { id: courseId }) || {};
    let lesson = {};
    if (_.isArray(course.chapters)) {
      course.chapters.map((chapter) => {
        if (_.isEmpty(lesson) && _.isArray(chapter.lessons)) {
          lesson = _.find(chapter.lessons, { id: lessonId });
        }
        return null;
      });
    }
    let name = courseId;
    if (course.name) {
      name = course.name;
      const match = /^.*(L\d).*$/.exec(course.name);
      if (match[1]) {
        name = match[1];
      }
    }
    return `${name}-${lesson.name || lessonId}`;
  };

  handleSearch = (filters) => {
    const { dispatch } = this.props;
    dispatch(fetchRooms(filters));
  };

  handleCreateSchedule = (data) => {
    const { dispatch } = this.props;
    dispatch(createSchedule(data));
  };

  buildRowIndexes = () => {
    const rowIndexes = [];
    this.props.rooms.forEach((room) => {
      const newIndex = moment.unix(room.beginAt).format('HH:mm');
      if (!rowIndexes.find(index => index === newIndex)) {
        rowIndexes.push(newIndex);
      }
    });
    return rowIndexes.sort();
  };

  buildColumns = () => {
    const rowIndexes = this.buildRowIndexes().map(index => ({
      text: index,
      value: index,
    }));
    const columns = [
      {
        title: '时间段',
        width: 80,
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
        filters: rowIndexes,
        filterMultiple: true,
        onFilter: (filters, rowData) => filters.indexOf(rowData.time) >= 0,
      },
    ];

    const start = moment(this.props.filters.startDate);
    const end = moment(this.props.filters.endDate).add(1, 'days');
    const diff = end.diff(start, 'days');
    for (let i = 0; i < diff; i += 1) {
      const dateTitle = moment(this.props.filters.startDate)
        .add(i, 'days')
        .format('MM-DD');

      columns.push({
        title: dateTitle,
        width: i + 1 === diff ? null : 250,
        dataIndex: dateTitle,
        key: i,
        render: cell => this.renderTableCell(cell),
      });
    }

    return columns;
  };

  buildTableData = (columns) => {
    const rowIndexes = this.buildRowIndexes();
    const table = [];
    rowIndexes.forEach((rowIndex) => {
      const row = { time: rowIndex };
      columns.forEach((column) => {
        if (column.dataIndex !== 'time') {
          row[column.dataIndex] = [];
        }
      });

      table.push(row);
    });

    this.props.rooms.forEach((room) => {
      const startTime = moment.unix(room.beginAt);
      const dateTitle = startTime.format('MM-DD');
      const timeTitle = startTime.format('HH:mm');

      table[rowIndexes.indexOf(timeTitle)][dateTitle].push(room);
    });

    return table;
  };

  updateDimensions = () => {
    const documentElement = global.document.documentElement;
    const body = global.document.getElementsByTagName('body')[0];
    const w = global.window;
    const width =
      w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height =
      w.innerHeight || documentElement.clientHeight || body.clientHeight;
    this.setState({ width, height });
  };

  renderTableCell(rooms) {
    if (_.isEmpty(rooms)) {
      return <span />;
    }
    return (
      <Row type="flex" gutter={16}>
        {rooms.map((room) => {
          let teacherClassName = 'schedule-teacher';
          if (!room.teacherId) {
            teacherClassName += ' schedule-teacher-gray';
          }
          return (
            <Col className="schedule-item" key={room.id}>
              <div className="calendar-schedule">
                <span className="schedule-lesson">
                  {this.getLessonShortName(room.courseId, room.lessonId)}
                </span>
                <span className={teacherClassName}>
                  {room.teacherId > 0 ? room.teacherId : '未分配'}
                </span>
                <span className="schedule-student">
                  {room.studentCount}/{room.maxStudentCount}
                </span>
                {room.isInternal && <span><Icon type="lock" /></span>}
              </div>
            </Col>
          );
        })}
      </Row>
    );
  }

  render() {
    const columns = this.buildColumns();
    const dataSource = this.buildTableData(columns);
    const xScroll = Math.max(
      (columns.length - 1) * 250 + 80,
      this.state.width - 210,
    );
    const yScroll = this.state.height - 275;

    return (
      <div>
        <SearchForm
          courses={this.props.courses}
          teachers={this.props.teachers}
          roomTypes={this.props.roomTypes}
          onSearch={this.handleSearch}
          onCreateSchedule={this.handleCreateSchedule}
        />
        <Table
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="time"
          pagination={false}
          bordered
          scroll={{ x: xScroll, y: yScroll }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { room, course, teacher } = state;
  const { filters, rooms, roomTypes } = room;
  const { courses, loaded } = course;
  const { teachers } = teacher;

  return {
    loading: room.loading || course.loading,
    filters,
    rooms,
    roomTypes,
    courses,
    teachers,
    coursesLoaded: loaded,
  };
}

export default connect(mapStateToProps)(ScheduleCalendar);
