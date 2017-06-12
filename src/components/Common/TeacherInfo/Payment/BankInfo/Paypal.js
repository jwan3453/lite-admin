import React from 'react';

export default class Paypal extends React.Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    account: {},
  };

  render() {
    const { account } = this.props;

    return (
      <div>PayPal: {account.number}</div>
    );
  }
}

