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

import CourseCascader from '../CourseCascader';

const FormItem = Form.Item;

class CreateScheduleForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    courses: React.PropTypes.array,
    roomTypes: React.PropTypes.array,
    onSubmit: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    courses: [],
    roomTypes: [],
  };
  state = {
    confirmDirty: false,
    startTimeUsePreset: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      // console.log(values);
      if (!err) {
        const dateString = values.date.format('YYYY-MM-DD');
        const timeString = values.startTimeUsePreset ? values.startTimePreset : values.startTime.format('HH:mm');
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
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
            rules: [
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ],
          })(<CourseCascader courses={this.props.courses} changeOnSelect={false} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否内部">
          {getFieldDecorator('isInternal', {
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
            rules: [{ required: true, message: 'Please input date!' }],
          })(<DatePicker />)}
        </FormItem>
        <FormItem {...formItemLayout} label="模版时间">
          {getFieldDecorator('startTimeUsePreset', {
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
            rules: [
              { required: false, message: 'Please input the captcha you got!' },
            ],
          })(
            <Select size="large">
              <Select.Option value="20:00">20:00</Select.Option>
              <Select.Option value="10:00">10:00</Select.Option>
              <Select.Option value="18:00">18:00</Select.Option>
            </Select>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="开始时间"
          style={{ display: this.state.startTimeUsePreset ? 'none' : 'block' }}
        >
          {getFieldDecorator('startTime', {
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
            rules: [
              { required: true, message: 'Please input your phone number!' },
            ],
          })(
            <Select size="large">
              {this.props.roomTypes.map(type => (
                <Select.Option value={type.id.toString()} key={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="房间数">
          {getFieldDecorator('roomCount', {
            initialValue: 1,
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
