import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Icon,
  Select,
  DatePicker,
  Message,
  Input,
  Radio,
  Modal,
} from 'antd';

import DateRange, { getDateRange } from '../../../common/dateRange';
import CreateScheduleForm from '../../Common/CreateScheduleForm';
import CourseCascader from '../../Common/CourseCascader';
import TeacherAutoComplete from '../../Common/TeacherAutoComplete';

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

class ScheduleCalendarSearchForm extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    courses: React.PropTypes.array,
    teachers: React.PropTypes.array,
    roomTypes: React.PropTypes.array,
    onSearch: React.PropTypes.func.isRequired,
    onSwitchVisible: React.PropTypes.func.isRequired,
    onCreateSchedule: React.PropTypes.func.isRequired,
    scheduleVisible: React.PropTypes.bool.isRequired,
    copiedSchedule: React.PropTypes.object,
  };
  static defaultProps = {
    teachers: [],
    courses: [],
    roomTypes: [],
    scheduleVisible: false,
    copiedSchedule: {},
  };
  state = {
    expand: false,
    dateRangeKey: '-1',
    teachers: [],
  };

  handleCreateSchedule = (data) => {
    this.props.onCreateSchedule(data);
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const filters = {};

      let dateRange;
      if (Number(values.dateRangeKey) === -1) {
        dateRange = values.dateRange;
      } else if (values.dateRangeKey) {
        dateRange = getDateRange(values.dateRangeKey);
      }
      if (dateRange[0].diff(dateRange[1], 'day') > 7) {
        Message.error('时间区间不能超过一周');
      } else {
        filters.startDate = dateRange[0].format(dateFormat);
        filters.endDate = dateRange[1].format(dateFormat);

        if (values.courseCascader) {
          const [courseId, chapterId, lessonId] = values.courseCascader;
          if (courseId > 0) filters.courseId = courseId;
          if (chapterId > 0) filters.chapterId = chapterId;
          if (lessonId > 0) filters.lessonId = lessonId;
        }

        if (values.studentCount) {
          filters.studentCount = values.studentCount;
        }

        if (values.isInternal >= 0) {
          filters.isInternal = values.isInternal;
        }

        if (values.roomTypeId) {
          filters.roomTypeId = values.roomTypeId;
        }

        if (values.teacherId) {
          filters.teacherId = values.teacherId;
        }

        if (values.hasTeacher) {
          filters.hasTeacher = values.hasTeacher;
        }
        this.props.onSearch(filters);
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleDateRangeChange = () => {
    const { form } = this.props;
    form.setFields({
      dateRangeKey: {
        value: '-1',
        error: null,
      },
    });
  };

  handleDateRangeKeyChange = (dateRangeKey) => {
    const { form } = this.props;
    const dateRange = getDateRange(dateRangeKey);
    form.setFields({
      dateRange: {
        value: dateRange,
        error: null,
      },
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form className="jiuqu-search-form" onSubmit={this.handleSearch}>
        <Row gutter={16} type="flex">
          <Col span={4} style={{ textAlign: 'right' }}>
            <FormItem>
              {getFieldDecorator('dateRangeKey', {
                initialValue: 'today',
                rules: [
                  {
                    type: 'string',
                    required: false,
                  },
                ],
              })(
                <Select size="default" onChange={this.handleDateRangeKeyChange}>
                  <Select.Option key={-1} value={'-1'}>自定义</Select.Option>
                  {DateRange.map(range => (
                    <Select.Option key={range.k} value={range.k}>
                      {range.n}
                    </Select.Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('dateRange', {
                initialValue: getDateRange(),
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  size="default"
                  onChange={this.handleDateRangeChange}
                />,
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              {getFieldDecorator('isInternal', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group size="default">
                  <Radio.Button value={-1}>全部</Radio.Button>
                  <Radio.Button value={1}>
                    内部<Icon type="lock" />
                  </Radio.Button>
                  <Radio.Button value={0}>公开</Radio.Button>
                </Radio.Group>,
              )}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              {getFieldDecorator('hasTeacher', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Radio.Group size="default">
                  <Radio.Button value="all">全部</Radio.Button>
                  <Radio.Button value="false">未分配</Radio.Button>
                  <Radio.Button value="true">已分配</Radio.Button>
                </Radio.Group>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16} type="flex">
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('courseCascader', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <CourseCascader
                  courses={this.props.courses}
                  size="default"
                  changeOnSelect
                />,
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator('studentCount', {
                style: { lineHeight: 28 },
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input
                  size="default"
                  type="text"
                  placeholder="人数(x-y)"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem>
              {getFieldDecorator('teacherId', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <TeacherAutoComplete
                  size="default"
                  placeholder="老师账户名"
                  teachers={this.props.teachers}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16} type="flex" style={{ marginBottom: 0 }}>
          <Col span={18}>
            <Row type="flex" gutter={16}>
              <Col>
                <FormItem>
                  {getFieldDecorator('roomTypeId', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <Radio.Group size="default">
                      <Radio.Button value={0} key={0}>全部</Radio.Button>
                      {this.props.roomTypes.map(type => (
                        <Radio.Button value={type.id} key={type.id}>
                          {type.name}
                        </Radio.Button>
                      ))}
                    </Radio.Group>,
                  )}
                </FormItem>
              </Col>
              <Col>
                <Button
                  ghost
                  type="primary"
                  size="default"
                  onClick={this.props.onSwitchVisible}
                >
                  排课
                </Button>
              </Col>
            </Row>
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
        <Modal
          maskClosable={false}
          visible={this.props.scheduleVisible}
          title="新的排课"
          footer={null}
          onCancel={this.props.onSwitchVisible}
        >
          <CreateScheduleForm
            roomTypes={this.props.roomTypes}
            courses={this.props.courses}
            onSubmit={this.handleCreateSchedule}
            copiedSchedule={this.props.copiedSchedule}
          />
        </Modal>
      </Form>
    );
  }
}

export default Form.create()(ScheduleCalendarSearchForm);
