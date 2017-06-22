import React from 'react';
import {
  Button,
  Tooltip,
  Popconfirm,
} from 'antd';

export default class ActionBar extends React.Component {
  static propTypes = {
    showReplyDialog: React.PropTypes.func,
  };

  static defaultProps = {
    showReplyDialog: () => {},
  };

  render() {
    const buttonStyle = {
      marginRight: 8,
    };

    const {
      showReplyDialog,
    } = this.props;

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
          />
        </Tooltip>
        <Popconfirm
          title="此操作会影响老师奖金计算，确定继续？"
          placement="top"
        >
          <Tooltip title="设置有效" placement="top">
            <Button
              icon="check"
              style={buttonStyle}
            />
          </Tooltip>
        </Popconfirm>
        <Tooltip title="设置跟进" placement="top">
          <Button
            icon="eye"
          />
        </Tooltip>
      </div>
    );
  }
}

