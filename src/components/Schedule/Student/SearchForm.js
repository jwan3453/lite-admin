import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Radio,
  Button,
  DatePicker,
} from 'antd';

import _ from 'lodash';

import StudentSearchInput from '../../Common/StudentSearchInput';
import TeacherSearchInput from '../../Common/TeacherSearchInput';
import CourseCascader from '../../Common/CourseCascader';

import STUDENT_APPOINTMENT_STATUS from '../../../common/studentAppointment';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    courses: React.PropTypes.array,
    onSearch: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    courses: [],
  };

  reset = () => {
    this.props.form.resetFields();
  };

  handleSearch = () => {
    //  todo
    const filters = {};
    this.props.onSearch(filters);
  };

  render() {
    const {
      form,
      courses,
    } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form
        className="jiuqu-search-form"
        onSubmit={this.handleSearch}
      >
        <Row>
          <Col span={6}>
            <FormItem
              label="学生"
              {...formItemLayout}
            >
              {
                getFieldDecorator('studentId', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<StudentSearchInput />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
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
          <Col span={6}>
            <FormItem
              label="课程"
              {...formItemLayout}
            >
              {
                getFieldDecorator('courseCascader', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <CourseCascader
                    courses={courses}
                    size="default"
                  />,
                )
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="上课时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('dateRange', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <DatePicker.RangePicker
                    size="default"
                    style={{ width: '100%' }}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <FormItem
              label="状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
                  initialValue: -1,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Select>
                    <Select.Option
                      key={-1}
                      value={-1}
                    >全部</Select.Option>
                    {
                      _.map(
                        STUDENT_APPOINTMENT_STATUS,
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
          <Col span={6}>
            <FormItem
              label="内部课时"
              {...formItemLayout}
            >
              {
                getFieldDecorator('isInternal', {
                  initialValue: -1,
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio.Button value={-1}>全部</Radio.Button>
                    <Radio.Button value={1}>是</Radio.Button>
                    <Radio.Button value={0}>否</Radio.Button>
                  </Radio.Group>,
                )
              }
            </FormItem>
          </Col>
          <Col
            span={12}
            style={{ textAlign: 'right' }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              onClick={this.reset}
            >清空条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

