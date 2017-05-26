import moment from 'moment';
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
  AutoComplete,
} from 'antd';

import DateRange, { getDateRange } from '../../../common/dateRange';
import CreateScheduleForm from '../../Common/CreateScheduleForm';
import CourseCascader from '../../Common/CourseCascader';

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';

class ScheduleCalendarSearchForm extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    courses: React.PropTypes.array,
    teachers: React.PropTypes.array,
    roomTypes: React.PropTypes.array,
    onSearch: React.PropTypes.func.isRequired,
    onCreateSchedule: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    teachers: [],
    courses: [],
    roomTypes: [],
  };
  state = {
    visible: false,
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
        dateRange[1] = dateRange[1].add(-1, 'day');
      }
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

      console.log('Received values of form: ', values);
      console.log(filters);
      this.props.onSearch(filters);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handleDateRangeKeyChange = (value) => {
    this.setState({
      dateRangeKey: value,
    });
  };

  handleDateRangeChange = (dates) => {
    const range = moment(dates[1]).diff(moment(dates[0]), 'd');
    if (range >= 7) {
      Message.error('时间区间不能超过一周');
    } else {
      this.setState({
        dateRangeKey: '-1',
      });
    }
  };

  handleSearchTeacher = (value) => {
    if (value.length < 3) {
      this.setState({ teachers: [] });
      return;
    }
    const teachers = this.props.teachers.filter((teacher) => {
      const name = `${teacher.username || ''} ${teacher.nickname || ''}`;
      return name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
    this.setState({ teachers });
  };

  handleScheduleTimeChange = (value) => {
    this.setState({ scheduleTime: value });
  };

  handleCourseChange = (value) => {
    console.log('course changed:', value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const children = this.state.teachers.map(teacher => (
      <AutoComplete.Option key={`${teacher.id}`}>
        {teacher.username}
      </AutoComplete.Option>
    ));

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
                <Select size="default">
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
                  onChange={this.handleCourseChange}
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
                  placeholder="人数(x|(>,>=,<.<=)x|x-y)"
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
                <AutoComplete
                  size="default"
                  placeholder="老师账户名"
                  dataSource={this.state.teachers}
                  onSearch={this.handleSearchTeacher}
                >
                  {children}
                </AutoComplete>,
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
                  onClick={() => this.setState({ visible: true })}
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
          visible={this.state.visible}
          title="新的排课"
          footer={null}
          onCancel={() => this.setState({ visible: false })}
        >
          <CreateScheduleForm
            roomTypes={this.props.roomTypes}
            courses={this.props.courses}
            onSubmit={this.handleCreateSchedule}
          />
        </Modal>
      </Form>
    );
  }
}

export default Form.create()(ScheduleCalendarSearchForm);
