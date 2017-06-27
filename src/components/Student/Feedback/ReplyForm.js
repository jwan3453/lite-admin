import React from 'react';
import {
  Form,
  Input,
  Checkbox,
  Icon,
  Button,
} from 'antd';

const FormItem = Form.Item;

class Reply extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };

  handleSubmit = () => {
    this.props.onSubmit();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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

    return (
      <Form layout="vertical" onSubmit={this.handleSubmit}>
        <FormItem
          hasFeedback
          help="必填字段"
        >
          {
            getFieldDecorator('reply', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input
                type="textarea"
                rows={6}
                placeholder="对家长反馈的情况作回应"
              />,
            )
          }
        </FormItem>
        <FormItem
          label=""
        >
          {
            getFieldDecorator('wechatNotice', {
              valuePropName: 'checked',
              initialValue: true,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Checkbox>发送微信模板</Checkbox>)
          }
        </FormItem>
        <FormItem
          label=""
        >
          <Icon
            type="info-circle"
            style={{
              color: '#108ee9',
              marginRight: 8,
            }}
          />保存后处理状态自动变成：已处理
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Reply);

