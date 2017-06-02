import React, { Component } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
} from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const SelectOption = Select.Option;

const funnels = [
  {
    value: 'remit',
    name: '银行卡',
  },
  {
    value: 'alipay',
    name: '支付宝',
  },
];

class GiftForm extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  static propTypes = {};

  static defaultProps = {};

  state = {
  };

  render() {
    const { form } = this.props;
    const formFields = form.getFieldsValue();
    const showFunnelDetailForm = /5|6/.test(formFields.productId);

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form>
          <FormItem
            label="赠送产品"
            {...formItemLayout}
          >
            {
              getFieldDecorator('productId', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select>
                  <SelectOption key="1" value="1">产品 1</SelectOption>
                  <SelectOption key="5" value="5">产品 5</SelectOption>
                </Select>,
              )
            }
          </FormItem>
          <FormItem
            label="数量"
            {...formItemLayout}
          >
            {
              getFieldDecorator('amount', {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <InputNumber
                  min={1}
                  placeholder="数量"
                  style={{ width: '100%' }}
                />,
              )
            }
          </FormItem>
          {
            showFunnelDetailForm &&
            <FormItem
              label="赠送渠道"
              {...formItemLayout}
            >
              {
                getFieldDecorator('funnel', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(
                  <RadioGroup>
                    {
                      funnels.map(item => (
                        <Radio key={item.value} value={item.value}>{item.name}</Radio>
                      ))
                    }
                  </RadioGroup>,
                )
              }
            </FormItem>
          }
          {
            showFunnelDetailForm &&
            <FormItem
              label="支付姓名"
              {...formItemLayout}
            >
              {
                getFieldDecorator('nickname', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input placeholder="支付姓名" />)
              }
            </FormItem>
          }
          {
            showFunnelDetailForm &&
            <FormItem
              label="支付账号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('bankAccount', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input placeholder="支付账号" />)
              }
            </FormItem>
          }
        </Form>
      </div>
    );
  }
}

export default Form.create()(GiftForm);
