import React from 'react';
import moment from 'moment';
import {
  Form,
  InputNumber,
  Radio,
  DatePicker,
  TimePicker,
  Switch,
  Select,
  Button,
} from 'antd';

import _ from 'lodash';

import CourseCascader from '../CourseCascader';
import ScheduleTimes from '../../../common/scheduleTimes';

const FormItem = Form.Item;

class CreateScheduleForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    courses: React.PropTypes.array,
    roomTypes: React.PropTypes.array,
    onSubmit: React.PropTypes.func.isRequired,
    copiedSchedule: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    form: {},
    courses: [],
    roomTypes: [],
    copiedSchedule: {},
  };
  state = {
    confirmDirty: false,
    startTimeUsePreset: true,
    autoCompleteResult: [],
  };
  componentWillMount() {
    const { copiedSchedule } = this.props;
    if (copiedSchedule.beginAt) {
      const scheduleTime = moment.unix(copiedSchedule.beginAt).format('HH:mm');
      this.setState({
        startTimeUsePreset: (ScheduleTimes.indexOf(scheduleTime) >= 0),
      });
    }
  }
  getCourseCascaderInitailValue = () => {
    const { copiedSchedule, courses } = this.props;
    if (copiedSchedule.courseId && copiedSchedule.lessonId) {
      const course = _.find(courses, { id: copiedSchedule.courseId });
      if (!_.isEmpty(course) && !_.isEmpty(course.chapters)) {
        let chapterId = null;
        let lessonId = null;
        course.chapters.map((chapter) => {
          if (!_.isEmpty(chapter.lessons)) {
            chapter.lessons.map((lesson) => {
              if (lesson.id === copiedSchedule.lessonId) {
                chapterId = chapter.id;
                lessonId = lesson.id;
              }
              return null;
            });
          }
          return null;
        });
        if (chapterId && lessonId) {
          return [copiedSchedule.courseId, chapterId, lessonId];
        }
      }
    }
    return null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const dateString = values.date.format('YYYY-MM-DD');
        const timeString = values.startTimeUsePreset
          ? values.startTimePreset
          : values.startTime.format('HH:mm');
        const beginString = `${dateString} ${timeString}:00`;
        const beginAt = moment(beginString).unix();
        const endAt = moment(beginString).add(values.lifeTime, 'm').unix();

        this.props.onSubmit({
          courseId: values.courseCascader[0],
          chapterId: values.courseCascader[1],
          lessonId: values.courseCascader[2],
          beginAt,
          endAt,
          roomTypeId: parseInt(values.roomTypeId, 10),
          roomCount: parseInt(values.roomCount, 10),
          isInternal: values.isInternal,
        });
      }
    });
  };

  render() {
    const { copiedSchedule, form, courses } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="选择课时">
          {getFieldDecorator('courseCascader', {
            initialValue: this.getCourseCascaderInitailValue(),
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ],
          })(
            <CourseCascader
              courses={courses}
              changeOnSelect={false}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否内部">
          {getFieldDecorator('isInternal', {
            initialValue: copiedSchedule.isInternal || false,
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
          })(
            <Radio.Group>
              <Radio value>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="日期">
          {getFieldDecorator('date', {
            initialValue: copiedSchedule.beginAt ? moment.unix(copiedSchedule.beginAt) : null,
            rules: [{ required: true, message: 'Please input date!' }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="模版时间">
          {getFieldDecorator('startTimeUsePreset', {
            initialValue: this.state.startTimeUsePreset,
            rules: [
              { required: false, message: 'Please input the captcha you got!' },
            ],
          })(
            <Switch
              checked={this.state.startTimeUsePreset}
              onChange={value => this.setState({ startTimeUsePreset: value })}
            />,
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="开始时间"
          style={{ display: this.state.startTimeUsePreset ? 'block' : 'none' }}
        >
          {getFieldDecorator('startTimePreset', {
            initialValue: copiedSchedule.beginAt ? moment.unix(copiedSchedule.beginAt).format('HH:mm') : null,
            rules: [
              { required: false, message: 'Please input the captcha you got!' },
            ],
          })(
            <Select size="large">
              {ScheduleTimes.map(time => (
                <Select.Option key={time} value={time}>{time}</Select.Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始时间"
          style={{ display: this.state.startTimeUsePreset ? 'none' : 'block' }}
        >
          {getFieldDecorator('startTime', {
            initialValue: copiedSchedule.beginAt ? moment.unix(copiedSchedule.beginAt) : null,
            rules: [
              { required: false, message: 'Please input the captcha you got!' },
            ],
          })(<TimePicker size="large" format="HH:mm" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="时长">
          {getFieldDecorator('lifeTime', {
            initialValue: 30,
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
          })(<InputNumber min={15} max={120} size="large" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="班型">
          {getFieldDecorator('roomTypeId', {
            initialValue: copiedSchedule.roomTypeId || null,
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
          })(
            <Select size="large">
              {this.props.roomTypes.map(type => (
                <Select.Option value={type.id} key={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="房间数">
          {getFieldDecorator('roomCount', {
            initialValue: copiedSchedule.roomCount || 1,
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
          })(<InputNumber min={1} size="large" />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">创建排课</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CreateScheduleForm);
