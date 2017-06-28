import React from 'react';
import {
  Button,
  Tooltip,
  Popconfirm,
} from 'antd';

export default class ActionBar extends React.Component {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    onConfirm: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      onEdit,
      onRemove,
      onConfirm,
    } = this.props;

    return (
      <div>
        <Tooltip title="编辑" placement="top">
          <Button
            icon="edit"
            onClick={onEdit}
            style={{ marginRight: 8 }}
          />
        </Tooltip>
        <Popconfirm
          title="该操作不可逆，确定继续？"
          okText="确定"
          cancelText="取消"
          onConfirm={onRemove}
        >
          <Tooltip
            title="删除"
            placement="top"
          >
            <Button
              icon="delete"
              style={{ marginRight: 8 }}
            />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          title="该操作会产生计费，确定继续？"
          okText="确定"
          cancelText="取消"
          onConfirm={onConfirm}
        >
          <Tooltip
            title="确认到岗"
            placement="top"
          >
            <Button icon="check" />
          </Tooltip>
        </Popconfirm>
      </div>
    );
  }
}

