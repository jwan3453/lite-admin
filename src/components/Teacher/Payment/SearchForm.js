import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  Input,
} from 'antd';

import _ from 'lodash';
import TEACHER_STATUS from '../../../common/teacherStatus';
import BILLING_CYCLES from '../../../common/teacherBillingCycle';
import PAYMENT_STATUS from '../../../common/teacherPaymentStatus';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  search = () => {
    //  todo search
  };

  reset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form className="jiuqu-search-form">
        <Row type="flex" style={{ marginBottom: 0 }}>
          <Col span={8}>
            <FormItem
              label="老师账号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('teacherName', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input size="default" placeholder="老师账号" />)
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="老师状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('teacherStatus', {
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
                      _.map(TEACHER_STATUS, item => (
                        <Select.Option
                          key={item.value}
                          value={item.value}
                        >{item.text}</Select.Option>
                      ))
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('ctime', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="提现状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('paymentStatus', {
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
                      _.map(PAYMENT_STATUS, item => (
                        <Select.Option
                          key={item.value}
                          value={item.value}
                        >{item.text}</Select.Option>
                      ))
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="结算周期"
              {...formItemLayout}
            >
              {
                getFieldDecorator('billingCycle', {
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
                          value={item.value}
                        >{item.name}</Select.Option>
                      ))
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={() => this.search()}
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              onClick={() => this.reset()}
            >清除条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

