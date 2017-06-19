import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  Radio,
  Input,
  InputNumber,
} from 'antd';
import _ from 'lodash';

import CERTIFICATE_TYPES from '../../../common/certificationTypes';
import CERTIFICATE_STATUS from '../../../common/certificationStatus';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    showCertDialog: React.PropTypes.func,
  };

  static defaultProps = {
    showCertDialog: () => {},
  };

  search = () => {
    //  todo search
  };

  reset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { showCertDialog, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form className="jiuqu-search-form">
        <Row type="flex">
          <Col span={8}>
            <FormItem
              label="名称"
              {...formItemLayout}
            >
              {
                getFieldDecorator('title', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input size="default" placeholder="资质名称" />)
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="有效期"
              {...formItemLayout}
            >
              {
                getFieldDecorator('validDays', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<InputNumber min={1} style={{ width: '100%' }} />)
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="认证类型"
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
                      _.map(CERTIFICATE_TYPES, item => (
                        <Select.Option
                          key={item.value}
                          value={item.value}
                        >{item.text}</Select.Option>
                      ))
                    }
                  </Select>,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="是否必须"
              {...formItemLayout}
            >
              {
                getFieldDecorator('isRequired', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Radio.Group>
                    <Radio.Button
                      key={1}
                      value={1}
                    >必须</Radio.Button>
                    <Radio.Button
                      key={0}
                      value={0}
                    >非必须</Radio.Button>
                  </Radio.Group>,
                )
              }
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem
              label="激活状态"
              {...formItemLayout}
            >
              {
                getFieldDecorator('status', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <Radio.Group>
                    {
                      _.map(CERTIFICATE_STATUS, item => (
                        <Radio.Button
                          key={item.value}
                          value={item.value}
                        >{item.text}</Radio.Button>
                      ))
                    }
                  </Radio.Group>,
                )
              }
            </FormItem>
          </Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={this.search}
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              onClick={this.reset}
              style={{ marginRight: 8 }}
            >清空条件</Button>
            <Button
              onClick={() => { showCertDialog(); }}
            >新建资质</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

