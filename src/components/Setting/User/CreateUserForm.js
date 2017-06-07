import React from 'react';
import {
  Form,
  Select,
  Button,
  Input,
} from 'antd';

const FormItem = Form.Item;

class CreateUserForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    roles: React.PropTypes.array,
    onSubmit: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    roles: [],
  };
  state = {
    confirmDirty: false,
    lessonValidityType: '0',
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) this.props.onSubmit(values);
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    const roles = this.props.roles || [];
    const children = roles.map(role => (
      <Select.Option key={role.id} value={String(role.id)}>
        {role.name}
      </Select.Option>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="手机号">
          {getFieldDecorator('mobile', {
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码',
            }, {
              validator: this.checkConfirm,
            }],
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="确认密码">
          {getFieldDecorator('confirm', {
            rules: [{ required: true, message: '请确认密码!',
            }, {
              validator: this.checkPassword,
            }],
          })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="角色">
          {getFieldDecorator('roleId', {
            initialValue: '9999',
            rules: [{ required: false }],
          })(
            <Select size="large">
              {children}
            </Select>,
          )}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CreateUserForm);
