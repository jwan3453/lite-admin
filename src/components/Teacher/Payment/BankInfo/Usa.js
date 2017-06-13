import React from 'react';

export default class Usa extends React.Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    account: {},
  };

  render() {
    const { account } = this.props;
    return (
      <div>
        <div>账号：{account.number}</div>
        <div>{account.bank.name} {account.country}</div>
        <div>账户类型：{account.type}</div>
        <div>汇款路线号码：{account.routing}</div>
        <div>持有人：{account.holder.name}</div>
      </div>
    );
  }
}

