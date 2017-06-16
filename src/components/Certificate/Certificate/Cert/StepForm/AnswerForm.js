import React from 'react';
import {
  Form,
  Input,
  Radio,
  Button,
  Icon,
  Upload,
} from 'antd';

const FormItem = Form.Item;

class AnswerForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };

    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange() {},
    };

    return (
      <Form>
        <FormItem
          label="选项"
          {...formItemLayout}
        >
          {
            getFieldDecorator('title', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        <FormItem
          label="图片"
          {...formItemLayout}
        >
          {
            getFieldDecorator('picture', {
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Upload
                {...uploadProps}
              >
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>,
              )
          }
        </FormItem>
        <FormItem
          label="是否正确"
          {...formItemLayout}
        >
          {
            getFieldDecorator('correct', {
              initialValue: 0,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                <Radio key="1" value={1}>是</Radio>
                <Radio key="0" value={0}>否</Radio>
              </Radio.Group>,
              )
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AnswerForm);

