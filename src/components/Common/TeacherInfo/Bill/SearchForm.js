import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
} from 'antd';

import * as INCOME_CATEGORY from './categories';
import * as BILL_STATUS from './status';

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
      <Form>
        <Row type="flex">
          <Col span={8}>
            <FormItem
              label="账单时间"
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
                    size="default"
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
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
                      BILL_STATUS.STATUS.map(item => (
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
              label="收入分类"
              {...formItemLayout}
            >
              {
                getFieldDecorator('category', {
                  initialValue: 'all',
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select>
                    <Select.Option
                      key="all"
                      value="all"
                    >全部</Select.Option>
                    {
                      INCOME_CATEGORY.CATEGORIES.map(item => (
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
        </Row>
        <Row type="flex">
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={() => { this.search(); }}
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              onClick={() => { this.reset(); }}
            >清空条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

