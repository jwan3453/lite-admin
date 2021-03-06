import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
} from 'antd';

import INCOME_CATEGORIES from '../../../common/teacherIncomeCategories';
import BILL_STATUS from '../../../common/teacherBillStatus';

const FormItem = Form.Item;
const DATE_FORMAT = 'YYYY-MM-DD';

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

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

        if (values.status !== '-1') {
          filters.status = parseInt(values.status, 10);
        }

        if (values.category !== '-1') {
          filters.type = parseInt(values.category, 10);
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
                      BILL_STATUS.map(item => (
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
              label="收入分类"
              {...formItemLayout}
            >
              {
                getFieldDecorator('category', {
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
                      INCOME_CATEGORIES.map(item => (
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
        </Row>
        <Row type="flex">
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={this.search}
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

