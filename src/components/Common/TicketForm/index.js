import React from 'react';
import {
  Form,
  Select,
  Input,
  Tooltip,
  Modal,
  Icon,
} from 'antd';

import _ from 'lodash';

import StudentSelector from '../../Common/StudentSelector';

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
  };

  static defaultProps = {
    ticket: getEmptyTicket(),
  };

  state = {
    dialogVisible: false,
    selectedUser: this.props.ticket.user,
  };

  pickUpUser = () => {
    this.props.form.setFieldsValue({
      user: this.state.selectedUser.id,
    });
    this.hideStudentSelector();
  };

  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const selectedUser = selectedRows[0];
    this.setState({
      selectedUser,
    });
  };

  showStudentSelector = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  hideStudentSelector = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  render() {
    const { form, ticket } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const { selectedUser } = this.state;

    return (
      <div>
        <Form>
          <FormItem
            label="分类"
            {...formItemLayout}
          >
            {
              getFieldDecorator('type', {
                initialValue: ticket.type,
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
                          value={item.value}
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
              getFieldDecorator('user', {
                initialValue: ticket.user.id,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<input type="hidden" />)
            }
            <Input
              value={selectedUser.nickname}
              addonAfter={
                <Tooltip title="添加用户" placement="top">
                  <Icon
                    type="user-add"
                    onClick={this.showStudentSelector}
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
                initialValue: ticket.assignee.nickname,
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
                initialValue: ticket.ctime,
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
                initialValue: ticket.status,
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
                          value={item.value}
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
              getFieldDecorator('comment', {
                initialValue: ticket.comment,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input type="textarea" placeholder="备注" />)
            }
          </FormItem>
        </Form>
        <Modal
          title="选择用户"
          maskClosable={false}
          visible={this.state.dialogVisible}
          onOk={this.pickUpUser}
          onCancel={this.hideStudentSelector}
        >
          <StudentSelector
            onSelectedRowsChange={this.handleSelectChange}
          />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Ticket);

