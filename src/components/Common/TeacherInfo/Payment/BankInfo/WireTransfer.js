import React from 'react';

export default class WireTransfer extends React.Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    account: {},
  };

  render() {
    const { account } = this.props;
    const { bank } = account;

    return (
      <div>
        <div>账号: {account.number}</div>
        <div>{bank.name} {account.country}</div>
        <div>SWIFT: {account.swiftCode}</div>
        <div>持有人: {account.holder.name}</div>
        <div>分行: {bank.branch}</div>
        <div>分行SWIFT: {account.intermediarySwiftCode}</div>
      </div>
    );
  }
}

