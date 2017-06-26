import React from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';

const FormItem = Form.Item;

class CreateCommentForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newCrm = {
          comments: values.comment,
        };
        this.props.onSubmit(newCrm);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        span: 18,
        offset: 4,
      },
    };

    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <FormItem
          label="用户备注"
          {...formItemLayout}
        >
          {
            getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="textarea" rows={5} />)
          }
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}


export default Form.create()(CreateCommentForm);

