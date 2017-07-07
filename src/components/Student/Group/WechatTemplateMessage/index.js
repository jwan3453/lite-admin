import React from 'react';
import { connect } from 'react-redux';
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
    wechatTemplates: {},
  };

  state = {
    tid: '',
    isTesting: true,
    studentId: -1,
  };

  testWechatTmplMessage = (eventArgs) => {
    //  todo, send a wechat template message to a student for testing purpose
    eventArgs.preventDefault();
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        const studentId = values.studentId;
        console.log('testWechatTmplMessage', studentId, values);
      }
    });
  };

  sendWechatTmplMessage = (eventArgs) => {
    //  todo, call api to create a task for batch sending wechat template messages
    eventArgs.preventDefault();
    const { form } = this.props;
    form.validateFields((errors, values) => {
      if (!errors) {
        console.log('sendWechatTmplMessage', values);
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

    const templates = wechatTemplates.result || [];

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
      <Form>
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
                    templates,
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
                      onClick={this.sendWechatTmplMessage}
                    >发送消息</Button>
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
                        onClick={this.testWechatTmplMessage}
                      >发送测试消息</Button>
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

function mapStateToProps() {
  //  todo, if I was right we are going to load templates by calling a specified
  //  api
  return {
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
}

export default connect(mapStateToProps)(Form.create()(TemplateMessage));

