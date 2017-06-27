import React, { Component } from 'react';
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
} from 'antd';

import levels from '../../../../common/levels';
import AdminSearchInput from '../../../Common/AdminSearchInput';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

class BasicProfileForm extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  static propTypes = {};

  static defaultProps = {};

  state = {
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem
          label="昵称"
          {...formItemLayout}
        >
          {
            getFieldDecorator('nickname', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input placeholder="用户昵称" />)
          }
        </FormItem>
        <FormItem
          label="性别"
          {...formItemLayout}
        >
          {
            getFieldDecorator('gender', {
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
        <FormItem
          label="出生日期"
          {...formItemLayout}
        >
          {
            getFieldDecorator('birthDay', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<DatePicker placeholder="请选择日期" />)
          }
        </FormItem>
        <FormItem
          label="课程级别"
          {...formItemLayout}
        >
          {
            getFieldDecorator('level', {
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  levels.map(item => (
                    <Select.Option key={item.value} value={String(item.value)}>
                      {item.name}
                    </Select.Option>
                  ))
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="助教"
          {...formItemLayout}
        >
          {
            getFieldDecorator('assistant', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<AdminSearchInput />)
          }
        </FormItem>
        <FormItem
          label="所属组"
          {...formItemLayout}
        >
          {
            getFieldDecorator('group', {
              initialValue: '-1',
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                <Select.Option key="-1" value="-1">全部</Select.Option>
                <Select.Option key={1} value={1}>group 1</Select.Option>
                <Select.Option key={2} value={2}>group 2</Select.Option>
              </Select>,
            )
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(BasicProfileForm);
