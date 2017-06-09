import React from 'react';
import {
  Form,
  Radio,
  Select,
  Input,
  InputNumber,
} from 'antd';

import refundTypes from './refundTypes';
import refundFunnels from '../../../../common/refundFunnels';

const FormItem = Form.Item;
const Option = Select.Option;

class CustomRefundForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    refundType: React.PropTypes.number,
  };

  static defaultProps = {
    refundType: 1,
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };

    const { getFieldDecorator } = this.props.form;

    const {
      refundType,
    } = this.props;

    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="退款方式"
        >
          {getFieldDecorator('refundType', {
            initialValue: refundType,
            rules: [
              {
                required: false,
              },
            ],
          })(
            <Radio.Group>
              {
                refundTypes.map(item => (
                  <Radio key={item.value} value={item.value}>{item.name}</Radio>
                ))
              }
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="退款金额"
        >
          {
            getFieldDecorator('sum', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<InputNumber style={{ width: '100%' }} placeholder="退款金额" />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="退款课时"
        >
          {
            getFieldDecorator('hours', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber style={{ width: '100%' }} placeholder="退款课时" />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="退款通道"
        >
          {getFieldDecorator('refundFunnel', {
            initialValue: 1,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select size="large" disabled>
              {
                refundFunnels.map(item => (
                  <Option key={item.value} value={String(item.value)}>{item.name}</Option>
                ))
              }
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="退款原因"
        >
          {
            getFieldDecorator('comment', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" row={6} />)
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({
  onFieldsChange: (props, fields) => {
    if (fields.refundType) {
      props.handleRefundTypeChange(fields.refundType.value);
    }
  },
})(CustomRefundForm);

