import React from 'react';
import {
  Form,
  Select,
  Button,
} from 'antd';

import _ from 'lodash';

import TeacherSearchInput from '../../Common/TeacherSearchInput';
import BILLING_CYCLES from '../../../common/teacherBillingCycle';

const FormItem = Form.Item;


class PaymentForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        const data = {};
        data.teacherId = values.teacherId;

        if (values.paymentCycle === '-1') {
          data.paymentCycle = 3;
        } else {
          data.paymentCycle = parseInt(values.paymentCycle, 10);
        }
        this.props.onSubmit(data);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="老师"
            {...formItemLayout}
          >
            {
              getFieldDecorator('teacherId', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TeacherSearchInput />)
            }
          </FormItem>
          <FormItem
            label="结算周期"
            {...formItemLayout}
          >
            {
              getFieldDecorator('paymentCycle', {
                initialValue: '-1',
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select>
                  <Select.Option
                    key="-1"
                    value="-1"
                  >全部</Select.Option>
                  {
                    _.map(BILLING_CYCLES, item => (
                      <Select.Option
                        key={item.value}
                        value={`${item.value}`}
                      >{item.name}</Select.Option>
                    ))
                  }
                </Select>,
              )
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
              htmlType="submit"
            >提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(PaymentForm);
