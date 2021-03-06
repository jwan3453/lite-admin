import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
} from 'antd';

import StudentListModal from '../StudentListModal';

export default class StudentSearchInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    multiSelect: React.PropTypes.bool,
    value: React.PropTypes.number.isRequired,
    disabled: React.PropTypes.bool,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    onChange: () => {},
    multiSelect: false,
    disabled: false,
    style: { width: '100%' },
  };

  state = {
    studentDialogVisible: false,
    studentId: '',
    studentName: '',
    inputValue: !this.props.value || this.props.value < 0 ? '' : this.props.value,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (!nextProps.value) {
        this.setState({
          studentId: nextProps.value,
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
      inputValue: `${this.state.studentId} - ${this.state.studentName}`,
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
    const { multiSelect, disabled, style } = this.props;
    const {
      inputValue,
      studentId,
      studentSelectorVisible,
    } = this.state;
    const iconStyle = !disabled ? { cursor: 'pointer' } : null;
    const onIconClick = !disabled
      ? () => { this.showStudentListModal(); }
      : () => {};
    const selectedRowKeys = !studentId ? [] : [studentId];

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
          style={style}
        />
        <StudentListModal
          key="student-feedback-StudentListModal"
          title="选择学生"
          multiSelect={multiSelect}
          visible={studentSelectorVisible}
          selectedRowKeys={selectedRowKeys}
          onOk={this.pickUpStudent}
          onCancel={this.hideStudentListModal}
          onSelectedRowsChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

