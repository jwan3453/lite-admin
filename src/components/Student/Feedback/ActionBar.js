import React from 'react';
import {
  Button,
  Tooltip,
  Popconfirm,
  Dropdown,
  Menu,
} from 'antd';

import
  STATUS from './followStatus';

export default class ActionBar extends React.Component {
  static propTypes = {
    showReplyDialog: React.PropTypes.func,
    showTicketDialog: React.PropTypes.func,
    setUserful: React.PropTypes.func.isRequired,
    onFollowStatusChanged: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    showReplyDialog: () => {},
    showTicketDialog: () => {},
  };

  setUseful = () => {
    this.props.setUserful();
  };

  handleChangeFollowStatus = (e) => {
    const newStatusKey = parseInt(e.key, 10);
    this.props.onFollowStatusChanged(newStatusKey);
  };

  render() {
    const buttonStyle = {
      marginRight: 8,
    };

    const {
      showReplyDialog,
      showTicketDialog,
    } = this.props;

    const followStatusMenu = (
      <Menu onClick={this.handleChangeFollowStatus}>
        {
          STATUS.map(({ value, text }) =>
            <Menu.Item key={value}>{text}</Menu.Item>)
        }
      </Menu>
    );

    return (
      <div>
        <Tooltip title="回应" placement="top">
          <Button
            icon="message"
            style={buttonStyle}
            onClick={showReplyDialog}
          />
        </Tooltip>
        <Tooltip title="创建工单" placement="top">
          <Button
            icon="file-add"
            style={buttonStyle}
            onClick={showTicketDialog}
          />
        </Tooltip>
        <Popconfirm
          title="此操作会影响老师奖金计算，确定继续？"
          placement="top"
          onConfirm={() => {
            this.setUseful();
          }}
        >
          <Tooltip title="设置有效" placement="top">
            <Button
              icon="check"
              style={buttonStyle}
            />
          </Tooltip>
        </Popconfirm>
        <Tooltip title="设置跟进" placement="top">
          <Dropdown overlay={followStatusMenu}>
            <Button
              icon="eye"
            />
          </Dropdown>
        </Tooltip>
      </div>
    );
  }
}

