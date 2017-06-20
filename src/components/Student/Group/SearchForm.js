import React from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
} from 'antd';

import _ from 'lodash';

import GROUP_STATUS from './status';

const FormItem = Form.Item;

class Search extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSearch: React.PropTypes.func.isRequired,
    onCreateGroup: React.PropTypes.func.isRequired,
  };

  reset = () => {
    this.props.form.resetFields();
  };

  render() {
    const {
      form,
      onSearch,
      onCreateGroup,
    } = this.props;

    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form
        className="jiuqu-search-form"
        onSubmit={() => { onSearch(); }}
      >
        <Row>
          <Col span="8">
            <FormItem
              label="分组名称"
              {...formItemLayout}
            >
              {
                getFieldDecorator('name', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(<Input placeholder="分组名称" />)
              }
            </FormItem>
          </Col>
          <Col span="8">
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
                      _.map(GROUP_STATUS,
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
          <Col span="8" style={{ textAlign: 'right' }}>
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
              onClick={() => { onCreateGroup(); }}
            >新建分组</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(Search);

