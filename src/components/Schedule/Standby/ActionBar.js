import React from 'react';
import {
  Button,
  Tooltip,
  Popconfirm,
} from 'antd';

export default class ActionBar extends React.Component {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onConfirm: React.PropTypes.func.isRequired,
    editEnable: React.PropTypes.bool.isRequired,
  };

  render() {
    const {
      onEdit,
      onConfirm,
      editEnable,
    } = this.props;

    return (
      <div>
        <Tooltip title={editEnable ? '编辑' : '待命已冻结'} placement="top">
          <Button
            icon="edit"
            onClick={onEdit}
            style={{ marginRight: 8 }}
            disabled={!editEnable}
          />
        </Tooltip>
        <Popconfirm
          title="该操作会产生计费，确定继续？"
          okText="确定"
          cancelText="取消"
          onConfirm={onConfirm}
        >
          <Tooltip
            title={editEnable ? '确认到岗' : '待命已冻结'}
            placement="top"
          >
            <Button icon="check" disabled={!editEnable} />
          </Tooltip>
        </Popconfirm>
      </div>
    );
  }
}

