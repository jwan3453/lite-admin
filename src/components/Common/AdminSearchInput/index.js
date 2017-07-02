import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
} from 'antd';

import AdminListModal from '../AdminListModal';

export default class AdminSearchInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    filters: {},
    onChange: () => {},
    multiSelect: false,
    disabled: false,
    style: { width: '100%' },
  };

  state = {
    adminSelectorVisible: false,
    adminId: '',
    adminName: '',
    inputValue: !this.props.value || this.props.value < 0 ? '' : this.props.value,
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
      adminId: selected.id,
      adminName: selected.username,
    });
  };

  pickUpAdmin = () => {
    this.setState({
      inputValue: `${this.state.adminId} - ${this.state.adminName}`,
    });
    this.props.onChange(this.state.adminId);
    this.hideListModal();
  };

  showListModal = () => {
    this.setState({
      adminSelectorVisible: true,
    });
  };

  hideListModal = () => {
    this.setState({
      adminSelectorVisible: false,
    });
  };

  render() {
    const {
      adminId,
      inputValue,
      adminSelectorVisible,
    } = this.state;
    const { disabled, style } = this.props;
    const iconStyle = !disabled ? { cursor: 'pointer' } : null;
    const onIconClick = !disabled
      ? () => { this.showListModal(); }
      : () => {};
    const selectedRowKeys = !adminId ? [] : [adminId];

    return (
      <div>
        <Input
          size="default"
          value={inputValue}
          disabled={disabled}
          placeholder="选择员工"
          addonAfter={
            <Tooltip title="选择员工" placement="top">
              <Icon
                type="user-add"
                onClick={onIconClick}
                style={iconStyle}
              />
            </Tooltip>
          }
          style={style}
        />
        <AdminListModal
          title="选择员工"
          visible={adminSelectorVisible}
          selectedRowKeys={selectedRowKeys}
          onOk={this.pickUpAdmin}
          onCancel={this.hideListModal}
          onSelectedRowsChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

