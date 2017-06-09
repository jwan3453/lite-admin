import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  DatePicker,
} from 'antd';

import _ from 'lodash';

import * as BONUS_TYPE from '../../../../common/bonusTypes';
import * as BONUS_STATUS from '../../../../common/bonusStatus';

const FormItem = Form.Item;

class SearchForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  search = () => {
    //  todo search
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
      <Form>
        <Row type="flex" style={{ marginBottom: 0 }}>
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
                      _.map(BONUS_STATUS.STATUS, item => (
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
              label="奖励类型"
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
                      _.map(BONUS_TYPE.TYPES, item => (
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
              label="时间"
              {...formItemLayout}
            >
              {
                getFieldDecorator('ctime', {
                  rules: [
                    {
                      required: false,
                    },
                  ],
                })(
                  <DatePicker.RangePicker
                    size="default"
                    style={{ width: '100%' }}
                  />,
                )
              }
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" style={{ marginBottom: 0 }}>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={() => this.search()}
              style={{ marginRight: 8 }}
            >搜索</Button>
            <Button
              onClick={() => this.reset()}
            >清除条件</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(SearchForm);

