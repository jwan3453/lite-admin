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

class Answer extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    answer: React.PropTypes.object,
    visible: React.PropTypes.bool,
    answersPicture: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    answersPicture: false,
    answer: {
      title: '',
      picture: '',
      correct: 0,
    },
    onSubmit: () => {},
  };

  render() {
    const {
      form,
      visible,
      answer,
      answersPicture,
      onSubmit,
    } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };

    const buttonItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 8,
      },
    };

    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange() {},
    };

    return (
      <Form
        style={{
          display: visible ? 'block' : 'none',
        }}
      >
        <FormItem
          label="选项"
          {...formItemLayout}
        >
          {
            getFieldDecorator('title', {
              initialValue: answer.title,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        {
          answersPicture
          ?
            <FormItem
              label="图片"
              {...formItemLayout}
            >
              {
                getFieldDecorator('picture', {
                  initialValue: answer.picture,
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
          : null
        }
        <FormItem
          label="是否正确"
          {...formItemLayout}
        >
          {
            getFieldDecorator('correct', {
              initialValue: answer.correct,
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
        <FormItem {...buttonItemLayout}>
          <Button type="primary" onClick={onSubmit}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}

const AnswerForm = Form.create()(Answer);

export default AnswerForm;

