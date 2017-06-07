import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  Radio,
} from 'antd';

import levels from '../../../../common/levels';
import status from '../../../../common/teacherStatus';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class BasicInfo extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    teacherInfo: React.PropTypes.object,
  };

  static defaultProps = {
    teacherInfo: {
      id: 100,
      nickname: '',
      status: 1,
      level: 1,
      comment: '',
      gender: 1,
      contact: {
        im: '',
        phone: '',
        email: '',
      },
      nationality: {
        id: 1,
      },
      address: '',
      country: {
        id: 1,
      },
      salary: {
        amount: 8,
        currency: {
          id: 0,
        },
        billingCycle: 1,
      },
    },
  };

  render() {
    const {
      teacherInfo,
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem label="账号" {...formItemLayout}>
          {
            getFieldDecorator('account', {
              initialValue: teacherInfo.nickname,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="default" placeholder="老师账号" />)
          }
        </FormItem>
        <FormItem label="昵称" {...formItemLayout}>
          {
            getFieldDecorator('nickname', {
              initialValue: teacherInfo.nickname,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="default" placeholder="昵称" />)
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: teacherInfo.status,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select size="default">
                <Select.Option value="-1">全部</Select.Option>
                {status.map(item => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>,
            )
          }
        </FormItem>
        <FormItem label="级别" {...formItemLayout}>
          {
            getFieldDecorator('level', {
              initialValue: teacherInfo.level,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select size="default">
                <Select.Option value="-1">全部</Select.Option>
                <Select.Option value="0">未分级</Select.Option>
                {levels.map(level => (
                  <Select.Option key={level.value} value={level.value}>
                    {level.name}
                  </Select.Option>
                ))}
              </Select>,
            )
          }
        </FormItem>
        <FormItem label="备注" {...formItemLayout}>
          {
            getFieldDecorator('comment', {
              initialValue: teacherInfo.comment,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={4} />)
          }
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {
            getFieldDecorator('gender', {
              initialValue: teacherInfo.gender,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>,
            )
          }
        </FormItem>
        <FormItem label="邮箱" {...formItemLayout}>
          {
            getFieldDecorator('email', {
              initialValue: teacherInfo.contact.email,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input size="default" placeholder="邮箱" />)
          }
        </FormItem>
        <FormItem label="手机号" {...formItemLayout}>
          {
            getFieldDecorator('phone', {
              initialValue: teacherInfo.contact.phone,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input size="default" placeholder="邮箱" />)
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(BasicInfo);
