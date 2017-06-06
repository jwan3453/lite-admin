import React from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';
import moment from 'moment';
import TICKET_TYPES from './ticketTypes';
import TICKET_STATUS from './ticketStatus';

const FormItem = Form.Item;

class TicketForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    assignees: React.PropTypes.array,
  };

  static defaultProps = {
    assignees: [],
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const {
      assignees,
    } = this.props;

    return (
      <Form>
        <FormItem
          label="分类"
          {...formItemLayout}
        >
          {
            getFieldDecorator('type', {
              initialValue: 0,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  TICKET_TYPES.map(item => (
                    <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>
                  ))
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="问题"
          {...formItemLayout}
        >
          {
            getFieldDecorator('subject', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        <FormItem
          label="问题"
          {...formItemLayout}
        >
          {
            getFieldDecorator('userId', {
              initialValue: '5',
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input disabled size="default" />)
          }
        </FormItem>
        <FormItem
          label="提交给"
          {...formItemLayout}
        >
          {
            getFieldDecorator('assignee', {
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  assignees.map(item => (
                    <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="联系时间"
          {...formItemLayout}
        >
          {
            getFieldDecorator('ctime', {
              initialValue: `${moment().format('YYYY-MM-DD hh:mm:ss')}`,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input size="default" />)
          }
        </FormItem>
        <FormItem
          label="处理状态"
          {...formItemLayout}
        >
          {
            getFieldDecorator('status', {
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  TICKET_STATUS.map(item => (
                    <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>
                  ))
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="备注"
          {...formItemLayout}
        >
          {
            getFieldDecorator('comment', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(TicketForm);

