import React from 'react';
import {
  Input,
  Tooltip,
  Icon,
} from 'antd';

import AdminListModal from '../AdminListModal';

export default class Admins extends React.Component {
  static propTypes = {
    value: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    filters: {},
    onChange: () => {},
    multiSelect: false,
    value: null,
  };

  state = {
    adminSelectorVisible: false,
    adminId: '',
    adminName: '',
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
      adminId: selected.id,
      adminName: selected.username,
    });
  };

  pickUpAdmin = () => {
    this.setState({
      inputValue: this.state.adminName,
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
    const { inputValue } = this.state;
    return (
      <div>
        <Input
          size="default"
          value={inputValue}
          placeholder="选择员工"
          addonAfter={
            <Tooltip title="选择员工" placement="top">
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
        <AdminListModal
          title="选择员工"
          visible={this.state.adminSelectorVisible}
          maskClosable={false}
          onOk={this.pickUpAdmin}
          onCancel={this.hideListModal}
          onSelectChange={this.handleSelectChange}
        />
      </div>
    );
  }
}
