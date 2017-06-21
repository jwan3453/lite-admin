import React from 'react';
import {
  Form,
  Select,
  Input,
  Icon,
  Tooltip,
  Modal,
} from 'antd';

import _ from 'lodash';

import UserSelector from '../../Common/FindStudentModal';

import TICKET_TYPES from '../../../common/ticketTypes';
import * as TICKET_STATUS from '../../../common/ticketStatus';

const FormItem = Form.Item;

class Ticket extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  state = {
    dialogVisible: false,
  };

  pickUpUser = () => {
    //  todo
  };

  showUserSelector = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  hideUserSelector = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  render() {
    const { form } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <div>
        <Form>
          <FormItem
            label="分类"
            {...formItemLayout}
          >
            {
              getFieldDecorator('type', {
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
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  placeholder="选择用户"
                  addonAfter={
                    <Tooltip title="添加用户" placement="top">
                      <Icon
                        type="user-add"
                        onClick={this.showUserSelector}
                      />
                    </Tooltip>
                  }
                />,
              )
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
              })(<Input />)
            }
          </FormItem>
          <FormItem
            label="联系时间"
            {...formItemLayout}
          >
            {
              getFieldDecorator('ctime', {
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
                initialValue: TICKET_STATUS.CREATED,
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
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input type="textarea" placeholder="问题描述" />)
            }
          </FormItem>
        </Form>
        <Modal
          title="选择用户"
          visible={this.state.dialogVisible}
          onOk={this.hideUserSelector}
          onCancel={this.hideUserSelector}
        >
          <UserSelector
            onSelectedRowsChange={this.pickUpUser}
          />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Ticket);

