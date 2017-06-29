import React from 'react';
import {
  Popconfirm,
  Tooltip,
  Button,
} from 'antd';

export default class ActionBar extends React.Component {
  static propTypes = {
    sendFeedbackReminder: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      sendFeedbackReminder,
    } = this.props;

    return (
      <Popconfirm
        title="操作不可逆，确认继续？"
        onConfirm={sendFeedbackReminder}
      >
        <Tooltip
          title="补发课后评价消息"
        >
          <Button icon="notification" />
        </Tooltip>
      </Popconfirm>
    );
  }
}

