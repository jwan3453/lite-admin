import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Icon,
  Input,
  Modal,
  DatePicker,
  Select,
  Tooltip,
} from 'antd';

import _ from 'lodash';

import PROGRESS_STATUS from './progressStatus';
import FOLLOW_STATUS from './followStatus';

import TeacherInput from '../../Common/TeacherInput';
import StudentSelector from '../../Common/StudentSelector';
import AdminSelector from '../../Common/AdminSelector';

const FormItem = Form.Item;

class Search extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  state = {
    selectedUser: null,
    selectedAssistant: null,
    selectedAssignee: null,
    studentSelectorVisible: false,
    assigneeSelectorVisible: false,
    assistantSelectorVisible: false,
  };
  onSelectedStudentChange = (selectedRowKeys, selectedRows) => {
    const selected = selectedRows[0];
    this.setState({
      selectedUser: selected,
    });
  };

  onSelectedAssistantChange = (selectedRowKeys, selectedRows) => {
    const selected = selectedRows[0];
    this.setState({
      selectedAssistant: selected,
    });
  };

  onSelectedAssigneeChange = (selectedRowKeys, selectedRows) => {
    const selected = selectedRows[0];
    this.setState({
      selectedAssignee: selected,
    });
  };


  search = (eventArgs) => {
    //  todo
    eventArgs.preventDefault();
    console.log('search', this.props.form.getFieldsValue());
  };

  reset = () => {
    this.props.form.resetFields();
  };
  pickUpStudent = () => {
    const { form } = this.props;
    form.setFieldsValue({
      user: this.state.selectedUser.id,
    });
  };

  pickUpAssignee = () => {
    const { form } = this.props;
    form.setFieldsValue({
      assignee: this.state.selectedUser.id,
    });
  };

  pickUpAssistant = () => {
    const { form } = this.props;
    form.setFieldsValue({
      assistant: this.state.selectedUser.id,
    });
  };
  showStudentSelector = () => {
    this.setState({
      studentSelectorVisible: true,
    });
  };

  hideStudentSelector = () => {
    this.setState({
      studentSelectorVisible: false,
    });
  };

  showAssistantSelector = () => {
    this.setState({
      assistantSelectorVisible: true,
    });
  };

  hideAssistantSelector = () => {
    this.setState({
      assistantSelectorVisible: false,
    });
  };

  showAssigneeSelector = () => {
    this.setState({
      assigneeSelectorVisible: true,
    });
  };

  hideAssigneeSelector = () => {
    this.setState({
      assigneeSelectorVisible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <div>
        <Form className="jiuqu-search-form" onSubmit={this.search}>
          <Row>
            <Col span={8}>
              <FormItem
                label="老师"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('teacher', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<TeacherInput />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="学生"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('user', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<input type="hidden" />)
                }
                <Input
                  placeholder="选择学生"
                  addonAfter={
                    <Tooltip title="选择学生" placement="top">
                      <Icon
                        type="user-add"
                        onClick={
                          () => { this.showStudentSelector(); }
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  }
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="教室"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('classRoom', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input placeholder="输入教室编号" />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="综合评分"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('average_rating', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input placeholder="[·=,<,<=,>,>=·][·1-5·]" />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="系统评分"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('system_rating', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input placeholder="[·=,<,<=,>,>=·][·1-5·]" />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="教师评分"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('teacher_rating', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<Input placeholder="[·=,<,<=,>,>=·][·1-5·]" />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="处理状态"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('progress', {
                    initialValue: '-1',
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <Select>
                      <Select.Option
                        key="-1"
                        value="-1"
                      >全部</Select.Option>
                      {
                        _.map(
                          PROGRESS_STATUS,
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
            </Col>
            <Col span={8}>
              <FormItem
                label="跟进状态"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('follow', {
                    initialValue: '-1',
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(
                    <Select>
                      <Select.Option
                        key="-1"
                        value="-1"
                      >全部</Select.Option>
                      {
                        _.map(
                          FOLLOW_STATUS,
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
            </Col>
            <Col span={8}>
              <FormItem
                label="上课时间"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('beginAt', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<DatePicker.RangePicker />)
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="学生助教"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('assistant', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<input type="hidden" />)
                }
                <Input
                  placeholder="选择助教"
                  addonAfter={
                    <Tooltip title="选择助教" placement="top">
                      <Icon
                        type="user-add"
                        onClick={
                          () => { this.showAssistantSelector(); }
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  }
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                label="处理人"
                {...formItemLayout}
              >
                {
                  getFieldDecorator('assignee', {
                    rules: [
                      {
                        required: false,
                      },
                    ],
                  })(<input type="hidden" />)
                }
                <Input
                  placeholder="选择处理人"
                  addonAfter={
                    <Tooltip title="选择处理人" placement="top">
                      <Icon
                        type="user-add"
                        onClick={
                          () => { this.showAssigneeSelector(); }
                        }
                        style={{ cursor: 'pointer' }}
                      />
                    </Tooltip>
                  }
                />
              </FormItem>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 8 }}
              >搜索</Button>
              <Button>清空条件</Button>
            </Col>
          </Row>
        </Form>
        <Modal
          key="student-feedback-StudentSelector"
          title="选择学生"
          visible={this.state.studentSelectorVisible}
          maskClosable={false}
          onOk={this.pickUpStudent}
          onCancel={this.hideStudentSelector}
        >
          <StudentSelector
            key="student-feedback-StudentSelector-selector"
            onSelectedRowsChange={this.onSelectedStudentChange}
          />
        </Modal>
        <Modal
          key="student-feedback-AssistantSelector"
          title="选择助教"
          visible={this.state.assistantSelectorVisible}
          maskClosable={false}
          onOk={this.pickUpAssistant}
          onCancel={this.hideAssistantSelector}
        >
          <AdminSelector
            key="student-feedback-AssistantSelector-selector"
            onSelectedRowsChange={this.onSelectedAssistantChange}
          />
        </Modal>
        <Modal
          key="student-feedback-AssigneeSelector"
          title="选择处理人"
          visible={this.state.assigneeSelectorVisible}
          maskClosable={false}
          onOk={this.pickUpAssignee}
          onCancel={this.hideAssigneeSelector}
        >
          <AdminSelector
            key="student-feedback-AssigneeSelector-selector"
            onSelectedRowsChange={this.onSelectedAssigneeChange}
          />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(Search);

