import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Icon, Modal, Spin, Message } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import './index.less';

import { fetchRooms, fetchRoom, fetchRoomTypes } from '../../../app/actions/room';
import { fetchCourses } from '../../../app/actions/course';
import { createSchedule } from '../../../app/actions/schedule';
import { fetchTeachers } from '../../../app/actions/teacher';

import SearchForm from './SearchForm';
import RoomInfo from '../../Common/RoomInfo';

class ScheduleCalendar extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    filters: React.PropTypes.object,
    courses: React.PropTypes.array,
    roomTypes: React.PropTypes.array,
    rooms: React.PropTypes.array,
    roomInfo: React.PropTypes.object,
    teachers: React.PropTypes.array,
    coursesLoaded: React.PropTypes.bool.isRequired,
    loading: React.PropTypes.bool.isRequired,
    dimensions: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    filters: {},
    courses: [],
    rooms: [],
    roomInfo: {},
    roomTypes: [],
    teachers: [],
    dimensions: {
      width: 0,
      height: 0,
    },
  };
  state = {
    roomVisible: false,
  };

  componentDidMount() {
    const { dispatch, filters, coursesLoaded } = this.props;
    if (!coursesLoaded) dispatch(fetchCourses());
    dispatch(fetchRoomTypes());
    dispatch(fetchRooms(filters));
    dispatch(fetchTeachers());
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

  getRoomModalLessonName = () => {
    const { roomInfo } = this.props;
    if (!_.isEmpty(roomInfo.schedule)) {
      return this.getLessonShortName(roomInfo.schedule.courseId, roomInfo.schedule.lessonId);
    }
    return '';
  };

  handleSearch = (filters) => {
    const { dispatch } = this.props;
    dispatch(fetchRooms(filters));
  };

  handleCreateSchedule = (data) => {
    const { dispatch, filters } = this.props;
    dispatch(createSchedule(data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建成功');
        dispatch(fetchRooms(filters));
      }
    });
  };

  handleRoomClick = (roomId) => {
    const { dispatch } = this.props;
    if (roomId) {
      this.setState({
        roomVisible: true,
      });
      dispatch(fetchRoom(roomId));
    }
  };

  hideRoomModal = () => {
    this.setState({
      roomVisible: false,
    });
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
            <Col
              className="schedule-item"
              key={room.id}
              onClick={() => this.handleRoomClick(room.id)}
            >
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
    const { dimensions } = this.props;
    const columns = this.buildColumns();
    const dataSource = this.buildTableData(columns);
    const xScroll = Math.max(
      (columns.length - 1) * 250 + 80,
      dimensions.width - 210,
    );
    const yScroll = dimensions.height - 275;
    const roomModalLessonName = this.getRoomModalLessonName();

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
        <Modal
          visible={this.state.roomVisible}
          title={`房间：${this.props.roomInfo.id || ''} (${roomModalLessonName})`}
          footer={null}
          onCancel={this.hideRoomModal}
          width={700}
        >
          <Spin spinning={this.props.loading}>
            <RoomInfo
              onHide={this.hideRoomModal}
              lessonName={roomModalLessonName}
            />
          </Spin>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { room, course, teacher, system } = state;
  const { filters, rooms, roomInfo, roomTypes } = room;
  const { courses, loaded } = course;
  const { teachers } = teacher;
  const { dimensions } = system;

  return {
    loading: room.loading || course.loading,
    filters,
    rooms,
    roomInfo,
    roomTypes,
    courses,
    teachers,
    coursesLoaded: loaded,
    dimensions,
  };
}

export default connect(mapStateToProps)(ScheduleCalendar);
