import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Input,
} from 'antd';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    pageSize: React.PropTypes.number.isRequired,
  };

  state = {
    pageSize: 10,
  };

  handleSearch = (eventArgs) => {
    eventArgs.preventDefault();
    const {
      onSearch,
      form,
      pageSize,
    } = this.props;

    form.validateFields((err, values) => {
      const filters = {
        pageSize,
      };

      console.log(values);

      onSearch(filters);
    });
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

    return (
      <Form
        className="jiuqu-search-form"
        onSubmit={this.handleSearch}
      >
        <Row>
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
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="开始时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('beginAt', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="日期"
              {...formItemLayout}
            >
              {
                getFieldDecorator('dateRange', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input />)
              }
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col
            span={24}
            style={{ textAlign: 'right' }}
          >
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
              htmlType="submit"
            >搜索
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              onClick={this.handleReset}
            >清空
            </Button>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
            >新建待命
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

