import React from 'react';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
} from 'antd';
import _ from 'lodash';

import TICKET_STATUS from '../../../common/ticketStatus';
import TICKET_TYPES from '../../../common/ticketTypes';
import StudentSearchInput from '../../Common/StudentSearchInput';
import AdminSearchInput from '../../Common/AdminSearchInput';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    search: React.PropTypes.func,
    showDialog: React.PropTypes.func,
  };

  static defaultProps = {
    search: () => {},
    showDialog: () => {},
  };

  search = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const filters = {};
        if (values.subject) {
          filters.subject = values.subject;
        }

        if (values.status && parseInt(values.status, 10) >= 0) {
          filters.status = parseInt(values.status, 10);
        }

        if (values.type && parseInt(values.type, 10) >= 0) {
          filters.type = parseInt(values.type, 10);
        }

        if (values.studentId) {
          filters.studentId = parseInt(values.studentId, 10);
        }

        if (values.assignee) {
          filters.adminId = parseInt(values.assignee, 10);
        }
        this.props.search(filters);
      }
    });
  };

  reset = () => {
    this.props.form.resetFields();
  };

  showDialog = () => {
    this.props.showDialog();
  };

  render() {
    const {
      form,
      showDialog,
    } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form className="jiuqu-search-form" onSubmit={this.search}>
        <Row>
          <Col span={8}>
            <FormItem
              label="问题描述"
              {...formItemLayout}
            >
              {
                getFieldDecorator('subject', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input placeholder="问题描述" />)
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="用户"
              {...formItemLayout}
            >
              {
                getFieldDecorator('studentId', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<StudentSearchInput placeholder="用户ID" />)
              }
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
                })(<AdminSearchInput placeholder="处理人" />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem
              label="状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
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
                        TICKET_STATUS,
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
          </Col>
          <Col span={8}>
            <FormItem
              label="工单类型"
              {...formItemLayout}
            >
              {
                getFieldDecorator('type', {
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
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              onClick={this.reset}
              style={{ marginRight: 8 }}
            >清空条件</Button>
            <Button
              type="primary"
              onClick={() => { showDialog(); }}
            >新建工单</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

