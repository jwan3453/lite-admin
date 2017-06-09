import React from 'react';

import StandardRefundForm from './StandardRefundForm';
import CustomRefundForm from './CustomRefundForm';

export default class RefundForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  state = {
    refundType: 1,
    refundFunnel: 1,
  };

  handleRefundTypeChange = (value) => {
    this.setState({
      refundType: value,
    });
  };

  render() {
    const refundType = this.state.refundType;
    return refundType === 1 ?
      <StandardRefundForm
        ref={(node) => {
          this.form = node;
        }}
        refundType={refundType}
        handleRefundTypeChange={this.handleRefundTypeChange}
      /> :
      <CustomRefundForm
        ref={(node) => {
          this.form = node;
        }}
        refundType={refundType}
        handleRefundTypeChange={this.handleRefundTypeChange}
      />;
  }
}

