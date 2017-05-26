import React from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { Form, Icon, Input, Button, Alert } from 'antd';

import './index.less';
import auth from '../../common/auth';

const FormItem = Form.Item;

function getPrefixIcon(icon) {
  const props = {
    style: {
      fontSize: 13,
    },
  };

  return <Icon type={icon} {...props} />;
}

class Index extends React.Component {
  state = {
    inFlight: false,
  };

  redirectToIndex = () => {
    this.setState({ inFlight: false });
    hashHistory.replace('/');
  };

  handleSubmitFail = (error) => {
    this.setState({
      errorMessage: error.message,
      inFlight: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      errorMessage: null,
    });

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          inFlight: true,
        });

        auth
          .login(values.mobile, values.password, values.nonce)
          .then(this.redirectToIndex)
          .catch(this.handleSubmitFail);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login-page">
        <h1>JiuQu Admin Dashboard</h1>
        <div className="login-form-wrapper">
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('mobile', {
                rules: [
                  { required: true, message: 'Please input your mobile!' },
                ],
              })(<Input prefix={getPrefixIcon('user')} placeholder="mobile" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' },
                ],
              })(
                <Input
                  prefix={getPrefixIcon('lock')}
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('nonce', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your 2-step verification code!',
                  },
                ],
              })(
                <Input
                  addonBefore={<span><Icon type="solution" /> Code</span>}
                />,
              )}
            </FormItem>

            <FormItem>
              {this.state.errorMessage &&
                <Alert
                  message={this.state.errorMessage}
                  type="error"
                  showIcon
                />}
              <Button
                loading={this.state.inFlight}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

Index.propTypes = {
  form: React.PropTypes.object,
};

Index.defaultProps = {};

function stateToProps() {
  return {};
}

export default connect(stateToProps)(Form.create()(Index));
