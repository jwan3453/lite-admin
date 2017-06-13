import _ from 'lodash';

import React, { Component } from 'react';
import { AutoComplete } from 'antd';

import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';

export default class TeacherAutoComplete extends Component {
  static propTypes = {
    teachers: React.PropTypes.array,
  };
  static defaultProps = {
    teachers: [],
  };
  state = {
    teachers: [],
  };

  handleSearchTeacher = (value) => {
    if (value.length < 3) {
      this.setState({ teachers: [] });
      return;
    }
    const teachers = this.props.teachers.filter((teacher) => {
      const name = `${teacher.username || ''} ${teacher.nickname || ''}`;
      return name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
    this.setState({ teachers });
  };

  render() {
    const children = this.state.teachers.map((teacher) => {
      const status = TEACHER_STATUS_MAP[teacher.statusId] || {};
      return (
        <AutoComplete.Option
          key={`${teacher.id}`}
          style={status.color ? { color: status.color } : {}}
        >
          {`${teacher.username} - ${status.text || '未知状态'}`}
        </AutoComplete.Option>
      );
    });
    return (
      <AutoComplete
        dataSource={this.state.teachers}
        onSearch={this.handleSearchTeacher}
        {..._.omit(this.props, 'teachers', 'options')}
      >
        {children}
      </AutoComplete>
    );
  }
}
