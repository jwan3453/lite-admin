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

import TeacherSearchInput from '../../Common/TeacherSearchInput';
import STANDBY_STATUS from './teacherStandbyStatus';
import SCHEDULE_TIMES from '../../../common/scheduleTimes';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func.isRequired,
  };

  state = {
    pageSize: 10,
  };

  handleSearch = (eventArgs) => {
    eventArgs.preventDefault();
    const {
      onSearch,
      form,
      pageSize,
    } = this.props;

    form.validateFields((err, values) => {
      const filters = {
        pageSize,
        ...values,
      };

      onSearch(filters);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const {
      form,
      onCreate,
    } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    let enableStartTimeSearch = false;
    const dateRange = form.getFieldValue('dateRange');

    if (dateRange && dateRange.length === 2 && dateRange[0].isSame(dateRange[1])) {
      enableStartTimeSearch = true;
    }

    return (
      <Form
        className="jiuqu-search-form"
        onSubmit={this.handleSearch}
      >
        <Row>
          <Col span={6}>
            <FormItem
              label="老师"
              {...formItemLayout}
            >
              {
                getFieldDecorator('teacher', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<TeacherSearchInput />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="开始时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('beginAt', {
                  initialValue: '-1',
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select disabled={!enableStartTimeSearch}>
                    <Select.Option
                      key="-1"
                      value="-1"
                      disabled={!enableStartTimeSearch}
                    >全部</Select.Option>
                    {
                      _.map(
                        SCHEDULE_TIMES,
                        item => (
                          <Select.Option
                            key={item}
                            value={item}
                          >{item}</Select.Option>
                        ),
                      )
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="日期"
              {...formItemLayout}
            >
              {
                getFieldDecorator('dateRange', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<DatePicker.RangePicker />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
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
                      _.map(
                        STANDBY_STATUS,
                        item => (
                          <Select.Option
                            key={item.value}
                            value={item.value}
                          >{item.text}</Select.Option>
                        ),
                      )
                    }
                  </Select>,
                  )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{ textAlign: 'right' }}
          >
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
            >清空条件
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
              onClick={onCreate}
            >新建待命
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

