import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
} from 'antd';

import TeacherListModal from '../TeacherListModal';

export default class TeacherSearchInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number.isRequired,
    disabled: React.PropTypes.bool,
  };

  static defaultProps = {
    filters: {},
    teachers: {},
    onChange: () => {},
    multiSelect: false,
    disabled: false,
  };

  state = {
    teacherSelectorVisible: false,
    teacherId: '',
    teacherName: '',
    inputValue: !this.props.value || this.props.value < 0 ? '' : this.props.value,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (!nextProps.value) {
        this.setState({
          teacherId: nextProps.value,
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
      inputValue: `${this.state.teacherId} - ${this.state.teacherName}`,
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
    const {
      inputValue,
      teacherId,
      teacherSelectorVisible,
    } = this.state;
    const { disabled } = this.props;
    const iconStyle = !disabled ? { cursor: 'pointer' } : null;
    const onIconClick = !disabled
      ? () => { this.showListModal(); }
      : () => {};
    const selectedRowKeys = !teacherId ? [] : [teacherId];

    return (
      <div>
        <Input
          value={inputValue}
          disabled={disabled}
          placeholder="选择老师"
          addonAfter={
            <Tooltip title="选择老师" placement="top">
              <Icon
                type="user-add"
                onClick={onIconClick}
                style={iconStyle}
              />
            </Tooltip>
          }
        />
        <TeacherListModal
          title="选择老师"
          visible={teacherSelectorVisible}
          selectedRowKeys={selectedRowKeys}
          onOk={this.pickUpTeacher}
          onCancel={this.hideListModal}
          onSelectedRowsChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

