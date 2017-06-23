import React from 'react';
import {
  Form,
  Select,
  Input,
  Tooltip,
  Icon,
  Button,
} from 'antd';

import _ from 'lodash';
import moment from 'moment';

import StudentListModal from '../StudentListModal';

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
  };

  static defaultProps = {
    ticket: getEmptyTicket(),
  };

  state = {
    studentSelectorVisible: false,
    selectedStudent: {},
  };

  pickUpUser = () => {
    this.hideStudentListModal();
  };

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const selectedUser = selectedRows[0];
    this.setState({
      selectedStudent: selectedUser,
    });
  };

  showStudentListModal = () => {
    this.setState({
      studentSelectorVisible: true,
    });
  };

  hideStudentListModal = () => {
    this.setState({
      studentSelectorVisible: false,
    });
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
          studentId: this.state.selectedStudent.id,
        };
        this.props.onSubmit(newTicket);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { form, ticket } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const {
      studentSelectorVisible,
    } = this.state;
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
              })(<input type="hidden" />)
            }
            <Input
              addonAfter={
                <Tooltip title="添加用户" placement="top">
                  <Icon
                    type="user-add"
                    onClick={this.showStudentListModal}
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
              }
            />
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
              })(<Input />)
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
        <StudentListModal
          key="common-ticketform"
          title="选择用户"
          maskClosable={false}
          visible={studentSelectorVisible}
          onOk={this.pickUpUser}
          onCancel={this.hideStudentListModal}
          onSelectedRowsChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

export default Form.create()(Ticket);

