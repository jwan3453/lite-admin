import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  DatePicker,
} from 'antd';

import ORDER_STATUS from '../../../common/orderStatus';

const FormItem = Form.Item;

class BillSearchForm extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    pageSize: React.PropTypes.number.isRequired,
  };

  static propTypes = {};

  static defaultProps = {};

  state = {
    pageSize: 10,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const filters = {};
      if (values.id) {
        filters.id = values.id;
      }
      if (values.title) {
        filters.title = values.title;
      }
      if (values.uid) {
        filters.uid = values.uid;
      }
      if (values.transactionTime) {
        filters.transactionTime = values.transactionTime;
      }
      if (values.status) {
        filters.status = values.status;
      }
      filters.pageSize = this.props.pageSize;
      this.props.onSearch(filters);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form className="jiuqu-search-form" onSubmit={this.handleSearch}>
        <Row type="flex" style={{ marginBottom: 0 }}>
          <Col span={6}>
            <FormItem label="订单ID" {...formItemLayout}>
              {
                getFieldDecorator('id', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input size="default" placeholder="订单ID" />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="账单标题" {...formItemLayout}>
              {
                getFieldDecorator('title', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input size="default" placeholder="账单标题" />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="所属用户ID" {...formItemLayout}>
              {
                getFieldDecorator('uid', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input size="default" placeholder="所属用户ID" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" style={{ marginBottom: 0 }}>
          <Col span={6}>
            <FormItem label="支付日期" {...formItemLayout}>
              {
                getFieldDecorator('transactionTime', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    size="default"
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="订单状态" {...formItemLayout}>
              {
                getFieldDecorator('status', {
                  initialValue: '-1',
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select size="default">
                    <Select.Option value="-1">全部</Select.Option>
                    {ORDER_STATUS.map(status => (
                      <Select.Option key={status.value} value={String(status.value)}>
                        {status.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
              htmlType="submit"
            >搜索
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              onClick={this.handleReset}
            >清空
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(BillSearchForm);
