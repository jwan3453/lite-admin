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

import funnels from '../../../common/refundFunnels';
import status from '../../../common/refundStatus';

const FormItem = Form.Item;

class RefundSearchForm extends Component {
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
      if (values.uid) {
        filters.id = values.uid;
      }
      if (values.refundTime) {
        filters.refundTime = values.refundTime;
      }
      if (values.id) {
        filters.id = values.id;
      }
      if (values.funnel) {
        filters.funnel = values.funnel;
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

  handleCreate = () => {}

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
            <FormItem label="用户ID" {...formItemLayout}>
              {getFieldDecorator('uid', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" placeholder="用户ID" />)}
            </FormItem>
          </Col>
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
            <FormItem label="状态" {...formItemLayout}>
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
                    {status.map(item => (
                      <Select.Option key={item.value} value={String(item.value)}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row style={{ marginBottom: 0 }}>
          <Col span={6}>
            <FormItem label="退款渠道" {...formItemLayout}>
              {
                getFieldDecorator('funnel', {
                  initialValue: '-1',
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select size="default">
                    <Select.Option value="-1">全部</Select.Option>
                    {funnels.map(funnel => (
                      <Select.Option key={funnel.value} value={String(funnel.value)}>
                        {funnel.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="退款申请时间" {...formItemLayout}>
              {getFieldDecorator('refundTime', {
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
              )}
            </FormItem>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              size="default"
              type="primary"
              htmlType="submit"
            >
              搜索
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              onClick={this.handleReset}
            >
              清空
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

}

export default Form.create()(RefundSearchForm);
