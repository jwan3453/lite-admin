import React from 'react';
import {
  Button,
  Tooltip,
} from 'antd';

export default class Withdrawed extends React.Component {
  static propTypes = {
    onShowDetails: React.PropTypes.func,
  };

  static defaultProps = {
    onShowDetails: () => null,
  };

  render() {
    const { onShowDetails } = this.props;
    return (
      <div>
        <Tooltip placement="top" title="查看明细">
          <Button
            icon="book"
            style={{ marginRight: 8 }}
            onClick={onShowDetails}
          />
        </Tooltip>
      </div>
    );
  }
}

