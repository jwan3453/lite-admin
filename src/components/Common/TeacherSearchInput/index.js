import React from 'react';
import { Input, Tooltip, Icon } from 'antd';

import TeacherListModal from '../TeacherListModal';
import TeacherName from '../Utils/TeacherName';

export default class TeacherSearchInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.number.isRequired,
    disabled: React.PropTypes.bool,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    filters: {},
    teachers: [],
    onChange: () => {},
    multiSelect: false,
    disabled: false,
    style: { width: '100%' },
  };

  state = {
    teacherSelectorVisible: false,
  };

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const selected = selectedRows[0];
    this.setState({
      teacherId: selected.id,
    });
  };

  pickUpTeacher = () => {
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
      teacherId: null,
    });
  };

  formatInputValue(teacherId, teacherName) {
    return teacherId ? `${teacherId} - ${teacherName}` : '';
  }

  render() {
    const { teacherSelectorVisible, teacherId } = this.state;
    const { disabled, style, value } = this.props;
    const iconStyle = !disabled ? { cursor: 'pointer' } : null;
    const onIconClick = !disabled
      ? () => {
        this.showListModal();
      }
      : () => {};
    const selectedRowKeys = [teacherId || value].filter(Boolean);

    return (
      <div>
        <TeacherName teacherId={value}>
          {teacherName => (
            <Input
              value={this.formatInputValue(value, teacherName)}
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
              style={style}
            />
          )}
        </TeacherName>
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
