import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
} from 'antd';

import TeacherListModal from '../TeacherListModal';

export default class Teachers extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number,
  };

  static defaultProps = {
    filters: {},
    teachers: {},
    onChange: () => {},
    multiSelect: false,
    value: null,
  };

  state = {
    teacherSelectorVisible: false,
    teacherId: '',
    teacherName: '',
    inputValue: '',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (!nextProps.value) {
        this.setState({
          adminId: nextProps.value,
          inputValue: '',
        });
      }
    }
  }

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const selected = selectedRows[0];
    this.setState({
      teacherId: selected.id,
      teacherName: selected.username,
    });
  };

  pickUpTeacher = () => {
    this.setState({
      inputValue: this.state.teacherName,
    });
    this.props.onChange(this.state.teacherId);
    this.hideListModal();
  };

  showListModal = () => {
    this.setState({
      teacherSelectorVisible: true,
    });
  };

  hideListModal = () => {
    this.setState({
      teacherSelectorVisible: false,
    });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div>
        <Input
          value={inputValue}
          placeholder="选择老师"
          addonAfter={
            <Tooltip title="选择老师" placement="top">
              <Icon
                type="user-add"
                onClick={
                  () => { this.showListModal(); }
                }
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
          }
        />
        <TeacherListModal
          title="选择老师"
          visible={this.state.teacherSelectorVisible}
          maskClosable={false}
          onOk={this.pickUpTeacher}
          onCancel={this.hideListModal}
          onSelectChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

