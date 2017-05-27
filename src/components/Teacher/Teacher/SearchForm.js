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

import status from '../../../common/teacherStatus';
import levels from '../../../common/levels';
import billingTypes from '../../../common/teacherBillingTypes';

const FormItem = Form.Item;

class TeacherSearchForm extends Component {
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
      if (values.status) {
        filters.status = values.status;
      }
      if (values.level) {
        filters.level = values.level;
      }
      if (values.statusChangeRange) {
        filters.statusChangeRange = values.statusChangeRange;
      }
      if (values.billingType) {
        filters.billingType = values.billingType;
      }
      filters.pageSize = this.props.pageSize;
      this.props.onSearch(filters);
    });
  };

  handleReset() {
    this.props.form.resetFields();
  }

  handleCreate() {}

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
            <FormItem label="老师" {...formItemLayout}>
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" placeholder="老师账号" />)}
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
                      <Select.Option key={item.value} value={item.value}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="级别" {...formItemLayout}>
              {
                getFieldDecorator('level', {
                  initialValue: '-1',
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
          </Col>
        </Row>
        <Row style={{ marginBottom: 0 }}>
          <Col span={6}>
            <FormItem label="状态更改时间" {...formItemLayout}>
              {getFieldDecorator('statusChangeRange', {
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
          <Col span={6}>
            <FormItem label="结算方式" {...formItemLayout}>
              {
                getFieldDecorator('billingType', {
                  initialValue: '-1',
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select size="default">
                    <Select.Option value="-1">全部</Select.Option>
                    {billingTypes.map(billingType => (
                      <Select.Option key={billingType.value} value={billingType.value}>
                        {billingType.name}
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
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              onClick={this.handleCreate}
            >
              新建
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

}

export default Form.create()(TeacherSearchForm);
