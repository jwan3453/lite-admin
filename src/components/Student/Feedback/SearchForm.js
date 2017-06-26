import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  DatePicker,
  Select,
} from 'antd';

import _ from 'lodash';

import PROGRESS_STATUS from './progressStatus';
import FOLLOW_STATUS from './followStatus';

import TeacherSearchInput from '../../Common/TeacherSearchInput';
import StudentSearchInput from '../../Common/StudentSearchInput';
import AdminSearchInput from '../../Common/AdminSearchInput';

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
          <Row style={{ marginBottom: 0 }}>
            <Col span={6}>
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
                  })(<TeacherSearchInput />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<StudentSearchInput />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<AdminSearchInput />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<Input size="default" placeholder="输入教室编号" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<Input size="default" placeholder="[·=,<,<=,>,>=·][·1-5·]" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<Input size="default" placeholder="[·=,<,<=,>,>=·][·1-5·]" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<Input size="default" placeholder="[·=,<,<=,>,>=·][·1-5·]" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                  })(<DatePicker.RangePicker size="default" />)
                }
              </FormItem>
            </Col>
            <Col span={6}>
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
                    <Select size="default" >
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
            <Col span={6}>
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
                    <Select size="default">
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
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 8 }}
              >搜索</Button>
              <Button>清空条件</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Search);

