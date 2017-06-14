import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
} from 'antd';

import _ from 'lodash';

import * as CERT_TYPE from '../../../../common/certificationTypes';
import * as CERT_STATUS from '../../../../common/certificationStatus';

const FormItem = Form.Item;

class BasicInfo extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    return (
      <Form>
        <FormItem
          label="认证类型"
          {...formItemLayout}
        >
          {
            getFieldDecorator('type', {
              initialValue: CERT_TYPE.GENERAL,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  _.map(CERT_TYPE.default, item => (
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
        <FormItem
          label="名称"
          {...formItemLayout}
        >
          {
            getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="default" placeholder="资质名称" />)
          }
        </FormItem>
        <FormItem
          label="状态"
          {...formItemLayout}
        >
          {
            getFieldDecorator('status', {
              initialValue: CERT_STATUS.UNACTIVATED,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                {
                  _.map(CERT_STATUS.default.reverse(), item => (
                    <Radio
                      key={item.value}
                      value={item.value}
                    >{item.text}</Radio>
                  ))
                }
              </Radio.Group>,
            )
          }
        </FormItem>
        <FormItem
          label="描述"
          {...formItemLayout}
        >
          {
            getFieldDecorator('comment', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={4} />)
          }
        </FormItem>
        <FormItem
          label="是否必须"
          {...formItemLayout}
        >
          {
            getFieldDecorator('required', {
              initialValue: 'true',
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                <Radio
                  key="1"
                  value="true"
                >是</Radio>
                <Radio
                  key="2"
                  value="false"
                >否</Radio>
              </Radio.Group>,
            )
          }
        </FormItem>
        <FormItem
          label="报酬"
          {...formItemLayout}
        >
          {
            getFieldDecorator('reward', {
              initialValue: 0,
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber min={0} style={{ width: '100%' }} />)
          }
        </FormItem>
        <FormItem
          label="报酬单位"
          {...formItemLayout}
        >
          {
            getFieldDecorator('rewardUnit', {
              initialValue: 'USD',
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                <Select.Option value="USD">USD</Select.Option>
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="有效时长"
          {...formItemLayout}
        >
          {
            getFieldDecorator('validDays', {
              initialValue: 90,
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber min={1} style={{ width: '100%' }} />)
          }
        </FormItem>

      </Form>
    );
  }
}

export default Form.create()(BasicInfo);

