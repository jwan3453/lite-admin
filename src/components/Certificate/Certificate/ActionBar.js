import React from 'react';
import {
  Button,
  Tooltip,
  Popconfirm,
} from 'antd';

export default class ActionBar extends React.Component {
  static propTypes = {
    isCertActivated: React.PropTypes.bool,
    deleteCert: React.PropTypes.func.isRequired,
    deactivateCert: React.PropTypes.func,
    activateCert: React.PropTypes.func,
    showTeachersDialog: React.PropTypes.func.isRequired,
    showCertDialog: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    isCertActivated: false,
    deleteCert: () => {},
    deactivateCert: () => {},
    activateCert: () => {},
    showTeachersDialog: () => {},
    showCertDialog: () => {},
  };

  render() {
    const {
      isCertActivated,
      showCertDialog,
      deleteCert,
      activateCert,
      deactivateCert,
      showTeachersDialog,
    } = this.props;

    const butonStyle = {
      marginRight: 8,
    };

    return (
      <div>
        <Tooltip
          placement="top"
          title="编辑"
        >
          <Button
            icon="edit"
            onClick={showCertDialog}
            style={butonStyle}
          />
        </Tooltip>
        <Popconfirm
          placement="left"
          title="确定删除？"
          onConfirm={deleteCert}
          okText="确定"
          cancelText="取消"
        >
          <Tooltip
            placement="top"
            title="删除"
          >
            <Button
              icon="delete"
              style={butonStyle}
            />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          placement="left"
          title={!isCertActivated ? '确定激活' : '确定冻结'}
          onConfirm={!isCertActivated ? activateCert : deactivateCert}
          okText="确定"
          cancelText="取消"
        >
          <Tooltip
            placement="top"
            title={!isCertActivated ? '激活' : '冻结'}
          >
            <Button
              icon={!isCertActivated ? 'unlock' : 'lock'}
              style={butonStyle}
            />
          </Tooltip>
        </Popconfirm>
        <Tooltip
          placement="top"
          title="邀请认证"
        >
          <Button icon="user" onClick={showTeachersDialog} />
        </Tooltip>
      </div>
    );
  }
}

