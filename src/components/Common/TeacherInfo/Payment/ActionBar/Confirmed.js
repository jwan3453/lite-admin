import React from 'react';
import {
  Button,
  Tooltip,
  Popconfirm,
} from 'antd';

export default class Created extends React.Component {
  static propTypes = {
    onShowDetails: React.PropTypes.func,
    onCompletePayment: React.PropTypes.func,
    onCancelPayment: React.PropTypes.func,
  };

  static defaultProps = {
    onShowDetails: () => null,
    onCompletePayment: () => null,
    onCancelPayment: () => null,
  };

  render() {
    const {
      onShowDetails,
      onCompletePayment,
      onCancelPayment,
    } = this.props;

    return (
      <div>
        <Tooltip placement="top" title="查看明细">
          <Button
            icon="book"
            style={{ marginRight: 8 }}
            onClick={onShowDetails}
          />
        </Tooltip>
        <Popconfirm
          placement="top"
          title="此操作不可逆，确定继续？"
          onConfirm={onCompletePayment}
        >
          <Tooltip placement="top" title="确认已付">
            <Button
              icon="credit-card"
              style={{ marginRight: 8 }}
            />
          </Tooltip>
        </Popconfirm>
        <Popconfirm
          placement="top"
          title="此操作不可逆，确定继续？"
          onConfirm={onCancelPayment}
        >
          <Tooltip placement="top" title="取消提现">
            <Button
              icon="close"
            />
          </Tooltip>
        </Popconfirm>
      </div>
    );
  }
}

