import React from 'react';
import {
  Form,
  Select,
  Button,
} from 'antd';

import _ from 'lodash';

import {
  TEACHER_APPOINTMENT_CREATED,
  teacherAppointmentsStatus as TEACHER_APPOINTMENT_STATUS,
} from '../../../common/teacherAppointment';

const FormItem = Form.Item;

class AppointmentStatus extends React.Component {
  static propTypes = {
    status: React.PropTypes.number,
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    status: TEACHER_APPOINTMENT_CREATED,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        let status = -1;
        if (values.status !== '-1') {
          status = parseInt(values.status, 10);
        }
        this.props.onSubmit(status);
      }
    });
  };

  render() {
    const { status, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="老师状态"
          {...formItemLayout}
        >
          {
            getFieldDecorator('status', {
              initialValue: `${status}`,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select>
                {
                  _.map(
                    TEACHER_APPOINTMENT_STATUS,
                    item => (
                      <Select.Option
                        key={item.value}
                        value={`${item.value}`}
                      >{item.text}</Select.Option>
                    ),
                  )
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(AppointmentStatus);

