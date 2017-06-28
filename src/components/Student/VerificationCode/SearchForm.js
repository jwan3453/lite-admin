import React from 'react';
import {
  Form,
  Button,
  Select,
  Input,
  Row,
  Col,
} from 'antd';
import _ from 'lodash';

import {
  TYPE_MAP as VERIFICATION_TYPE_MAP,
} from './verificationTypes';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  };

  handleSearch = (eventArgs) => {
    eventArgs.preventDefault();
    this.props.form.validateFields((err, values) => {
      const filters = {};
      filters.codeType = parseInt(values.type, 10);
      filters.mobile = parseInt(values.mobile, 10);
      this.props.onSearch(filters);
    });
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
      <Form
        className="jiuqu-search-form"
        onSubmit={this.handleSearch}
      >
        <Row>
          <Col span={8}>
            <FormItem
              label="验证类型"
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
                  <Select size="default">
                    <Select.Option
                      key="-1"
                      value="-1"
                    >全部</Select.Option>
                    {
                      _.map(
                        VERIFICATION_TYPE_MAP,
                        item => (
                          <Select.Option
                            key={item.value}
                            value={String(item.value)}
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
              label="手机号"
              {...formItemLayout}
            >
              {
                getFieldDecorator('mobile', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input size="default" placeholder="请输入用户手机号" />)
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  marginRight: 8,
                }}
              >搜索</Button>
              <Button
                onClick={this.reset}
              >清空条件</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

