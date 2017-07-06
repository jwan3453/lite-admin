import React from 'react';
import {
  Button,
} from 'antd';

export default class ActionBar extends React.Component {
  static propTypes = {
    visible: React.PropTypes.bool,
    onFilter: React.PropTypes.func,
    onSendWechatMessage: React.PropTypes.func,
  };

  static defaultProps = {
    visible: true,
    onFilter: () => {},
    onSendWechatMessage: () => {},
  };

  render() {
    const {
      visible,
      onFilter,
      onSendWechatMessage,
    } = this.props;

    return (
      <div
        style={{
          marginBottom: 16,
          display: !visible ? 'none' : 'block',
        }}
      >
        <Button
          icon="filter"
          type="primary"
          style={{ marginRight: 8 }}
          onClick={() => { onFilter(); }}
        >筛选</Button>
        <Button
          icon="message"
          onClick={onSendWechatMessage}
        >发送消息</Button>
      </div>
    );
  }
}

