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

import BONUS_TYPES from '../../../common/bonusTypes';
import BONUS_STATUS from '../../../common/bonusStatus';

import TeacherSearchInput from '../../Common/TeacherSearchInput';

const FormItem = Form.Item;
const DATE_FORMAT = 'YYYY-MM-DD';

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onCreate: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {};

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
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

        if (values.type !== '-1') {
          filters.awardType = parseInt(values.type, 10);
        }
        this.props.onSearch(filters);
      }
    });
  };
  create = () => {
    this.props.onCreate();
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
              label="老师"
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
                      _.map(BONUS_STATUS, item => (
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
              label="奖励类型"
              {...formItemLayout}
            >
              {
                getFieldDecorator('type', {
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
                      _.map(BONUS_TYPES, item => (
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
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={this.handleSearch}
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              style={{ marginRight: 8 }}
              onClick={() => this.reset()}
            >清除条件</Button>
            <Button
              onClick={() => this.create()}
            >创建</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

