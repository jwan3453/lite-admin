import React from 'react';
import {
  Row,
  Col,
  Form,
  Select,
  Input,
  Button,
} from 'antd';
import _ from 'lodash';

import CERT_STATUS from '../../../common/teacherCertStatus';
import TeacherSearchInput from '../../Common/TeacherSearchInput';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
  }

  handleSearch = (eventArgs) => {
    eventArgs.preventDefault();
    const filters = {};
    this.props.onSearch(filters);
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
      <Form className="jiuqu-search-form" onSubmit={this.handleSearch}>
        <Row>
          <Col span={6}>
            <FormItem
              label="老师"
              {...formItemLayout}
            >
              {
                getFieldDecorator('teacherId', {
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
              label="资质"
              {...formItemLayout}
            >
              {
                getFieldDecorator('cert', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Input
                    size="default"
                    placeholder="请输入资质名称"
                  />,
                )
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
                    >全部
                    </Select.Option>
                    {
                      _.map(
                        CERT_STATUS,
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
          <Col span={6} style={{ textAlign: 'right' }}>
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
    );
  }
}

export default Form.create()(SearchForm);

