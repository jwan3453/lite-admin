import React from 'react';
import {
  Form,
  Select,
  Input,
  Button,
} from 'antd';

import _ from 'lodash';
import moment from 'moment';

import AdminSearchInput from '../../Common/AdminSearchInput';
import StudentSearchInput from '../../Common/StudentSearchInput';

import TICKET_TYPES from '../../../common/ticketTypes';
import * as TICKET_STATUS from '../../../common/ticketStatus';

const getEmptyTicket = () => ({
  id: -1,
  subject: '',
  user: {
    id: -1,
    nickname: '',
  },
  assignee: {
    id: '',
    nickname: '',
  },
  ctime: '',
  status: TICKET_STATUS.CREATED,
  type: null,
});


const FormItem = Form.Item;

class Ticket extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    ticket: React.PropTypes.object,
    onSubmit: React.PropTypes.func.isRequired,
    studentInputDisabled: React.PropTypes.bool,
  };

  static defaultProps = {
    ticket: getEmptyTicket(),
    studentInputDisabled: false,
  };

  state = {
    studentSelectorVisible: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newTicket = {
          adminId: values.assignee,
          type: parseInt(values.type, 10),
          status: parseInt(values.status, 10),
          subject: values.subject,
          remark: values.remark,
          contactAt: moment(values.ctime).unix(),
          id: this.props.ticket.id,
          studentId: values.studentId,
        };
        this.props.onSubmit(newTicket);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { form, ticket, studentInputDisabled } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
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
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="分类"
            {...formItemLayout}
          >
            {
              getFieldDecorator('type', {
                initialValue: String(ticket.type),
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select>
                  {
                    _.map(
                      TICKET_TYPES,
                      item => (
                        <Select.Option
                          key={item.value}
                          value={String(item.value)}
                        >{item.name}</Select.Option>
                      ),
                    )
                  }
                </Select>,
              )
            }
          </FormItem>
          <FormItem
            label="问题描述"
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
              })(<Input type="textarea" placeholder="问题描述" />)
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
                    required: true,
                  },
                ],
              })(<StudentSearchInput disabled={studentInputDisabled} />)
            }
          </FormItem>
          <FormItem
            label="提交给"
            {...formItemLayout}
          >
            {
              getFieldDecorator('assignee', {
                initialValue: ticket.assignedAdminId,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<AdminSearchInput />)
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
              })(<Input placeholder="联系时间" />)
            }
          </FormItem>
          <FormItem
            label="处理状态"
            {...formItemLayout}
          >
            {
              getFieldDecorator('status', {
                initialValue: String(ticket.status),
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select>
                  {
                    _.map(
                      TICKET_STATUS.default,
                      item => (
                        <Select.Option
                          key={item.value}
                          value={String(item.value)}
                        >{item.name}</Select.Option>
                      ),
                    )
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
              })(<Input type="textarea" placeholder="备注" />)
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">提交</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Ticket);

