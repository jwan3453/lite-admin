import React, { Component } from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
  // Message,
  Input,
  // Radio,
  AutoComplete,
} from 'antd';

const FormItem = Form.Item;

class StudentSearchForm extends Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    assistants: React.PropTypes.array.isRequired,
  };
  static defaultProps = {
    assistants: [],
  };
  state = {
    visible: false,
    expand: false,
    assistants: [],
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const filters = {};
      console.log('Received values of form: ', values);
      console.log(filters);
      this.props.onSearch(filters);
    });
  };

  handleSearchAssistant = (value) => {
    if (value.length < 3) {
      this.setState({ assistants: [] });
      return;
    }
    console.log(this.props.assistants);
    const assistants = this.props.assistants.filter((assistant) => {
      const name = `${assistant.username || ''}`;
      return name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
    this.setState({ assistants });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const children = this.state.assistants.map(admin => (
      <AutoComplete.Option key={`${admin.id}`}>
        {admin.username}
      </AutoComplete.Option>
    ));
    return (
      <Form className="jiuqu-search-form" onSubmit={this.handleSearch}>
        <Row type="flex" style={{ marginBottom: 0 }}>
          <Col span={6}>
            <FormItem label="学生ID" {...formItemLayout}>
              {getFieldDecorator('id', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="注册时间" {...formItemLayout}>
              {getFieldDecorator('registerRange', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  size="default"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="课程级别" {...formItemLayout}>
              {getFieldDecorator('level', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select size="default">
                  <Select.Option value="-1">全部</Select.Option>
                  <Select.Option value="1">L1</Select.Option>
                  <Select.Option value="2">L2</Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="所属组" {...formItemLayout}>
              {getFieldDecorator('groupName', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="助教" {...formItemLayout}>
              {getFieldDecorator('assistantId', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <AutoComplete
                  size="default"
                  placeholder="助教名称"
                  dataSource={this.state.assistants}
                  onSearch={this.handleSearchAssistant}
                >
                  {children}
                </AutoComplete>,
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="渠道来源" {...formItemLayout}>
              {getFieldDecorator('sourceFlag', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="城市" {...formItemLayout}>
              {getFieldDecorator('city', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="手机尾号" {...formItemLayout}>
              {getFieldDecorator('mobileSuffix', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input size="default" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="跟进类型" {...formItemLayout}>
              {getFieldDecorator('crmStatus', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select size="default">
                  <Select.Option value="-1">全部</Select.Option>
                  <Select.Option value="0">新注册</Select.Option>
                  <Select.Option value="1">已联系</Select.Option>
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
              htmlType="submit"
            >
              搜索
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              onClick={this.handleReset}
            >
              清空
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(StudentSearchForm);
