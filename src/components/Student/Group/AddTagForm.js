import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';

class AddTag extends React.Component {
  static propTypes = {
    style: React.PropTypes.object,
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  handleSubmit = (eventArgs) => {
    eventArgs.preventDefault();
    const {
      form,
      onSubmit,
    } = this.props;

    form.validateFields((errors) => {
      if (!errors) {
        onSubmit();
      }
    });
  };

  render() {
    const {
      style,
      form,
    } = this.props;

    const { getFieldDecorator } = form;

    return (
      <Form
        onSubmit={this.handleSubmit}
        style={style}
        layout="inline"
      >
        <Form.Item
          help=""
          hasFeedback
        >
          {
            getFieldDecorator('tag', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Input
                size="default"
                placeholder="请输入Tag名字"
              />,
            )
          }
        </Form.Item>
        <Form.Item
          style={{
            marginRight: 0,
          }}
        >
          <Button
            size="default"
            type="primary"
            htmlType="submit"
          >添加</Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AddTag);

