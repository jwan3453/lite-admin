import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col, Icon, Modal, Spin, Message } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import './index.less';
import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';

import { fetchRooms, fetchRoom, fetchRoomTypes } from '../../../app/actions/room';
import { fetchCourses } from '../../../app/actions/course';
import { createSchedule, copySchedule } from '../../../app/actions/schedule';
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
    copiedSchedule: React.PropTypes.object,
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
    copiedSchedule: {},
  };
  state = {
    scheduleVisible: false,
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

  handleCopySchedule = (schedule) => {
    const { dispatch } = this.props;
    this.setState({
      scheduleVisible: true,
    });
    dispatch(copySchedule(schedule));
  };
  handleScheduleVisible = () => {
    this.setState({
      scheduleVisible: !this.state.scheduleVisible,
    });
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

  buildColumns = (rowIndexes) => {
    const filters = rowIndexes.map(index => ({
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
        filters,
        filterMultiple: true,
        onFilter: (value, record) => value.indexOf(record.time) >= 0,
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

  buildTableData = (rowIndexes, columns) => {
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

      if (table[rowIndexes.indexOf(timeTitle)][dateTitle]) {
        table[rowIndexes.indexOf(timeTitle)][dateTitle].push(room);
      }
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
          let teacherName = '未分配';
          let teacher = {};
          if (room.teacherId) {
            teacher = _.find(this.props.teachers, { id: room.teacherId }) || {};
            teacherName = teacher.username || `Teacher:${room.teacherId}`;
          }
          let teacherBackgroundColor;
          if (!_.isEmpty(teacher)) {
            const teacherStatus = TEACHER_STATUS_MAP[teacher.statusId];
            if (teacherStatus) {
              teacherBackgroundColor = teacherStatus.color;
            }
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
                <span
                  className="schedule-teacher"
                  style={teacherBackgroundColor ? { backgroundColor: teacherBackgroundColor } : {}}
                >
                  {teacherName}
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
    const { courses, teachers, roomTypes, roomInfo, dimensions, copiedSchedule } = this.props;
    const rowIndexes = this.buildRowIndexes();
    const columns = this.buildColumns(rowIndexes);
    const dataSource = this.buildTableData(rowIndexes, columns);
    const xScroll = Math.max(
      (columns.length - 1) * 250 + 80,
      dimensions.width - 210,
    );
    const yScroll = dimensions.height - 275;
    const roomModalLessonName = this.getRoomModalLessonName();

    return (
      <div>
        <Modal
          visible={this.state.roomVisible}
          title={`房间：${roomInfo.id || ''} (${roomModalLessonName})`}
          footer={null}
          onCancel={this.hideRoomModal}
          width={720}
        >
          <Spin spinning={this.props.loading}>
            <RoomInfo
              lessonName={roomModalLessonName}
              onHide={this.hideRoomModal}
              onCopySchedule={this.handleCopySchedule}
              roomInfo={roomInfo}
            />
          </Spin>
        </Modal>
        <SearchForm
          courses={courses}
          teachers={teachers}
          roomTypes={roomTypes}
          onSearch={this.handleSearch}
          onCreateSchedule={this.handleCreateSchedule}
          onSwitchVisible={this.handleScheduleVisible}
          scheduleVisible={this.state.scheduleVisible}
          copiedSchedule={copiedSchedule}
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
  const { schedule, room, course, teacher, system } = state;
  const { copiedSchedule } = schedule;
  const { filters, rooms, roomInfo, roomTypes } = room;
  const { courses, loaded } = course;
  const { teachers } = teacher;
  const { dimensions } = system;

  return {
    loading: room.loading || course.loading,
    filters,
    copiedSchedule,
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
