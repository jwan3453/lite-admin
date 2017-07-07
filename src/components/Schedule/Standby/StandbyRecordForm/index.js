import React from 'react';
import {
  Form,
  Select,
  DatePicker,
  Input,
  InputNumber,
} from 'antd';

import _ from 'lodash';
import moment from 'moment';

import * as STANDBY_STATUS from '../teacherStandbyStatus';
import SCHEDULE_TIMES from '../../../../common/scheduleTimes';

import TeacherSearchInput from '../../../Common/TeacherSearchInput';

const FormItem = Form.Item;

class StandbyRecord extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    standby: React.PropTypes.object,
  };
  static defaultProps = {
    standby: {},
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.standby !== nextProps.standby) {
      nextProps.form.resetFields();
    }
  }

  render() {
    const { standby } = this.props;
    const {
      getFieldDecorator,
    } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    const fromDate = standby.fromTime ? moment.unix(standby.fromTime) : moment();
    const fromTime = standby.fromTime ?
      moment.unix(standby.fromTime).format('HH:mm')
      : SCHEDULE_TIMES[0];

    return (
      <Form>
        <FormItem
          label="老师"
          {...formItemLayout}
        >
          {
            getFieldDecorator('teacher', {
              initialValue: standby.teacherId,
              rules: [
                {
                  required: false,
                },
              ],
            })(<TeacherSearchInput />)
          }
        </FormItem>
        <FormItem
          label="状态"
          {...formItemLayout}
        >
          {
            getFieldDecorator('status', {
              initialValue: Number(standby.status) || STANDBY_STATUS.CREATED,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  _.map(
                    STANDBY_STATUS.default,
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
        <FormItem
          label="日期"
          {...formItemLayout}
        >
          {
            getFieldDecorator('theDate', {
              initialValue: fromDate,
              rules: [
                {
                  required: true,
                },
              ],
            })(<DatePicker size="default" style={{ width: '100%' }} />)
          }
        </FormItem>
        <FormItem
          label="开始时间"
          {...formItemLayout}
        >
          {
            getFieldDecorator('time', {
              initialValue: fromTime,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  _.map(
                    SCHEDULE_TIMES,
                    time => (
                      <Select.Option
                        key={time}
                        value={time}
                      >{time}</Select.Option>
                    ),
                  )
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="薪资"
          {...formItemLayout}
        >
          {
            getFieldDecorator('fee', {
              initialValue: standby.free || 0,
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber size="default" min={0} style={{ width: '100%' }} />)
          }
        </FormItem>
        <FormItem
          label="备注"
          {...formItemLayout}
        >
          {
            getFieldDecorator('remark', {
              initialValue: standby.remark || '',
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={4} />)
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(StandbyRecord);

