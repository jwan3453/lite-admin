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
    search: React.PropTypes.func.isRequired,
  };

  state = {
    selectedUser: null,
    selectedAssistant: null,
    selectedAssignee: null,
    studentSelectorVisible: false,
    assigneeSelectorVisible: false,
    assistantSelectorVisible: false,
  };

  isNullOrUndefined = value => _.isNull(value) || _.isUndefined(value);

  search = (eventArgs) => {
    eventArgs.preventDefault();
    const fieldsValues = this.props.form.getFieldsValue();
    const filters = {};
    if (fieldsValues.beginAt) {
      if (fieldsValues.beginAt[0]) {
        filters.startDate = fieldsValues.beginAt[0].format('Y-MM-DD');
      }

      if (fieldsValues.beginAt[1]) {
        filters.endDate = fieldsValues.beginAt[1].format('Y-MM-DD');
      }
    }

    if (!this.isNullOrUndefined(fieldsValues.student)) {
      filters.studentId = parseInt(fieldsValues.student, 10);
    }

    if (!this.isNullOrUndefined(fieldsValues.assignee)) {
      filters.adminId = parseInt(fieldsValues.assignee, 10);
    }

    if (!this.isNullOrUndefined(fieldsValues.teacher)) {
      filters.teacherId = parseInt(fieldsValues.teacher, 10);
    }

    if (!this.isNullOrUndefined(fieldsValues.teacherRating)) {
      filters.teacherRating = fieldsValues.teacherRating;
    }

    if (!this.isNullOrUndefined(fieldsValues.systemRating)) {
      filters.systemRating = fieldsValues.systemRating;
    }

    if (!this.isNullOrUndefined(fieldsValues.averageRating)) {
      filters.rating = fieldsValues.averageRating;
    }

    if (!this.isNullOrUndefined(fieldsValues.follow)) {
      const followStatus = parseInt(fieldsValues.follow, 10);
      if (followStatus >= 0) {
        filters.followStatus = followStatus;
      }
    }

    if (!this.isNullOrUndefined(fieldsValues.progress)) {
      const progress = parseInt(fieldsValues.progress, 10);
      if (progress >= 0) {
        filters.status = progress;
      }
    }

    this.props.search(filters);
  };

  reset = () => {
    this.props.form.resetFields();
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
                  getFieldDecorator('student', {
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
                  getFieldDecorator('averageRating', {
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
                  getFieldDecorator('systemRating', {
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
                  getFieldDecorator('teacherRating', {
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
              <Button
                onClick={this.reset}
              >清空条件</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Search);

