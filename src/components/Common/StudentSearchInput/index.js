import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
} from 'antd';

import StudentListModal from '../StudentListModal';

export default class StudentInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    multiSelect: React.PropTypes.bool,
    value: React.PropTypes.number,
  };

  static defaultProps = {
    onChange: () => {},
    multiSelect: false,
    value: null,
  };

  state = {
    studentDialogVisible: false,
    studentId: '',
    studentName: '',
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
      studentId: selected.id,
      studentName: selected.nickname,
    });
  };

  pickUpStudent = () => {
    this.setState({
      inputValue: this.state.studentName,
    });
    this.props.onChange(this.state.studentId);
    this.hideStudentListModal();
  };

  showStudentListModal = () => {
    this.setState({
      studentSelectorVisible: true,
    });
  };

  hideStudentListModal = () => {
    this.setState({
      studentSelectorVisible: false,
    });
  };

  render() {
    const { multiSelect } = this.props;
    const { inputValue } = this.state;

    return (
      <div>
        <Input
          value={inputValue}
          placeholder="选择学生"
          addonAfter={
            <Tooltip title="选择学生" placement="top">
              <Icon
                type="user-add"
                onClick={
                  () => { this.showStudentListModal(); }
                }
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
          }
        />
        <StudentListModal
          key="student-feedback-StudentListModal"
          title="选择学生"
          multiSelect={multiSelect}
          visible={this.state.studentSelectorVisible}
          maskClosable={false}
          onOk={this.pickUpStudent}
          onCancel={this.hideStudentListModal}
          onSelectedRowsChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

