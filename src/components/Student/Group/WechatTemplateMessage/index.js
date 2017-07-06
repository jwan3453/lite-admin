import React from 'react';
import {
  Form,
  Select,
  Input,
  Button,
  Checkbox,
} from 'antd';

import _ from 'lodash';

import ParameterInput from './ParameterInput';
import StudentSearchInput from '../../../Common/StudentSearchInput';

const FormItem = Form.Item;

class TemplateMessage extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    wechatTemplates: React.PropTypes.object,
  };

  static defaultProps = {
    wechatTemplates: {
      result: [
        {
          id: 'Doclyl5uP7Aciu-qZ7mJNPtWkbkYnWBWVja26EGbNyk',
          title: '购买成功通知',
          content: '',
        },
      ],
    },
  };

  state = {
    tid: '',
    isTesting: true,
    studentId: -1,
  };

  handleSubmit = (eventArgs) => {
    eventArgs.preventDefault();
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        console.log('handleSubmit', values);
      }
    });
  };

  render() {
    const {
      form,
      wechatTemplates,
    } = this.props;

    const {
      tid,
      studentId,
      isTesting,
    } = this.state;

    let currentTemplate = null;
    if (tid) {
      currentTemplate = _.filter(
        wechatTemplates.result,
        item => item.id === tid,
      )[0] || null;
    }

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    const tailItemLayout = {
      wrapperCol: {
        offset: 5,
        span: 16,
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="消息模板"
          {...formItemLayout}
        >
          {
            getFieldDecorator('tid', {
              initialValue: tid,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select
                onChange={
                  (value) => {
                    this.setState({
                      tid: value,
                    });
                  }
                }
              >
                {
                  _.map(
                    wechatTemplates.result,
                    item => (
                      <Select.Option
                        key={item.id}
                        value={item.id}
                      >{item.title}</Select.Option>
                    ),
                  )
                }
              </Select>,
            )
          }
        </FormItem>
        {
          !currentTemplate
          ? null
          :
          (
            <div>
              <FormItem
                label="详细内容"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('content', {
                    initialValue: currentTemplate.content,
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <Input
                      disabled
                      size="default"
                      type="textarea"
                      rows={6}
                    />,
                  )
                }
              </FormItem>
              <FormItem
                label="参数"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('parameters', {
                    initialValue: {
                      primary_industry: 'test industry',
                    },
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<ParameterInput />)
                }
              </FormItem>
              <FormItem
                label="是否测试"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('isTesting', {
                    initialValue: isTesting,
                    valuePropName: 'checked',
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <Checkbox
                      onChange={
                        (eventArgs) => {
                          const checked = eventArgs.target.checked;
                          this.setState({
                            isTesting: checked,
                          });
                        }
                      }
                    />,
                  )
                }
              </FormItem>
              {
                !isTesting
                ? (
                  <FormItem
                    {...tailItemLayout}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                    >发送</Button>
                  </FormItem>
                  )
                : (
                  <div>
                    <FormItem
                      label="测试用户"
                      {...formItemLayout}
                    >
                      {
                        getFieldDecorator('studentId', {
                          initialValue: studentId,
                          rules: [
                            {
                              required: false,
                            },
                          ],
                        })(<StudentSearchInput />)
                      }
                    </FormItem>
                    <FormItem
                      {...tailItemLayout}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                      >测试</Button>
                    </FormItem>
                  </div>
                  )
              }
            </div>
          )
        }
      </Form>
    );
  }
}

export default Form.create()(TemplateMessage);

