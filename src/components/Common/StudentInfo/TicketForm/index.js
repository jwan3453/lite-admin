import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd';
import moment from 'moment';

import TICKET_TYPES from '../../../../common/ticketTypes';
import TICKET_STATUS from '../../../../common/ticketStatus';

const FormItem = Form.Item;

class TicketForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    assignees: React.PropTypes.array,
    ticket: React.PropTypes.object,
    onSubmit: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    assignees: [],
    ticket: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newTicket = {
          adminId: parseInt(values.assignee, 10),
          type: parseInt(values.type, 10),
          status: parseInt(values.status, 10),
          subject: values.subject,
          remark: values.remark,
          contactAt: moment(values.ctime).unix(),
          id: this.props.ticket.id,
        };
        this.props.onSubmit(newTicket);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const {
      assignees,
      ticket,
    } = this.props;

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
      <Form
        onSubmit={this.handleSubmit}
      >
        <FormItem
          label="分类"
          {...formItemLayout}
        >
          {
            getFieldDecorator('type', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select>
                {
                  TICKET_TYPES.map(item => (
                    <Select.Option
                      key={item.value}
                      value={String(item.value)}
                    >{item.name}</Select.Option>
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
              initialValue: ticket.subject,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        <FormItem
          label="用户"
          {...formItemLayout}
        >
          {
            getFieldDecorator('studentId', {
              initialValue: ticket.studentId,
              rules: [
                {
                  required: false,
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
                  required: true,
                },
              ],
            })(
              <Select
                showSearch
                filterOption={
                  (input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  assignees.map(item => (
                    <Select.Option
                      key={item.id}
                      value={String(item.id)}
                    >{item.username}</Select.Option>
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
              initialValue: `${moment(ticket.ctime || (new Date())).format('YYYY-MM-DD HH:mm:ss')}`,
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
              initialValue: '1',
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  TICKET_STATUS.map(item => (
                    <Select.Option
                      key={item.value}
                      value={String(item.value)}
                    >{item.name}</Select.Option>
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
            getFieldDecorator('remark', {
              initialValue: ticket.remark,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

function mapPropsToFields(props) {
  const { ticket } = props;
  return {
    type: { value: ticket.type ? String(ticket.type) : '' },
    assignee: { value: ticket.assignedAdminId ? String(ticket.assignedAdminId) : '' },
    status: { value: ticket.status ? String(ticket.status) : '' },
  };
}

export default Form.create({ mapPropsToFields })(TicketForm);
