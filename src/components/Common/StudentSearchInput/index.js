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
    disabled: React.PropTypes.bool,
  };

  static defaultProps = {
    onChange: () => {},
    multiSelect: false,
    value: null,
    disabled: false,
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
    const { multiSelect, disabled } = this.props;
    const { inputValue } = this.state;
    const iconStyle = !disabled ? { cursor: 'pointer' } : null;
    const onIconClick = !disabled
      ? () => { this.showStudentListModal(); }
      : () => {};

    return (
      <div>
        <Input
          value={inputValue}
          disabled={disabled}
          placeholder="选择学生"
          addonAfter={
            <Tooltip title="选择学生" placement="top">
              <Icon
                type="user-add"
                onClick={onIconClick}
                style={iconStyle}
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

