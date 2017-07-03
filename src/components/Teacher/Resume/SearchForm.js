import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
} from 'antd';

import TEACHER_RESULE_STATUS from '../../../common/teacherResumeStatus';

const FormItem = Form.Item;

class TeacherResumeSearchForm extends Component {
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
      const filter = {};
      if (values.status) {
        filter.status = values.status;
      }

      if (values.statusChangeRange) {
        const dateRange = values.statusChangeRange;
        filter.startTime = Date.parse(dateRange[0].format('YYYY-MM-DD')) / 1000;
        filter.endTime = Date.parse(dateRange[1].format('YYYY-MM-DD')) / 1000;
      }

      filter.pageSize = this.props.pageSize;
      this.props.onSearch(filter);
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
                    {
                      TEACHER_RESULE_STATUS.map(item => (
                        <Select.Option key={item.value} value={String(item.value)}>
                          {item.text}
                        </Select.Option>
                      ))
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="申请时间" {...formItemLayout}>
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
          <Col span={6} style={{ textAlign: 'right' }}>
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
          </Col>
        </Row>
      </Form>
    );
  }

}

export default Form.create()(TeacherResumeSearchForm);
