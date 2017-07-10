import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
} from 'antd';

import _ from 'lodash';
import BILLING_CYCLES from '../../../common/teacherBillingCycle';
import PAYMENT_STATUS from '../../../common/teacherPaymentStatus';

import TeacherSearchInput from '../../Common/TeacherSearchInput';

const FormItem = Form.Item;
const DATE_FORMAT = 'YYYY-MM-DD';

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {};

  search = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        const filters = {};
        if (values.teacherId) {
          filters.teacherId = values.teacherId;
        }

        if (values.ctime) {
          filters.startDate = values.ctime[0].format(DATE_FORMAT);
          filters.endDate = values.ctime[1].format(DATE_FORMAT);
        }

        if (values.paymentStatus !== '-1') {
          filters.status = parseInt(values.paymentStatus, 10);
        }

        if (values.paymentCycle !== '-1') {
          filters.paymentCycle = parseInt(values.paymentCycle, 10);
        }

        this.props.onSearch(filters);
      }
    });
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
                getFieldDecorator('teacherId', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<TeacherSearchInput />)
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
                          value={`${item.value}`}
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
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={this.search}
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

