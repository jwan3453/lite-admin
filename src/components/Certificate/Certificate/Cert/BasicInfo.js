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

const CERT_TYPES = CERT_TYPE.default;

const REVERSED_CERT_STATUS = CERT_STATUS.default.reverse();

class BasicInfo extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    certification: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    id: 0,
    title: '',
    required: false,
    reward: '',
    validDays: 90,
    status: CERT_STATUS.UNACTIVATED,
    type: CERT_TYPE.GENERAL,
    currency: 'USD',
    comment: '',
    steps: [],
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    };

    const { certification } = this.props;

    return (
      <Form>
        <FormItem
          label="认证类型"
          {...formItemLayout}
        >
          {
            getFieldDecorator('type', {
              initialValue: certification.type,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  _.map(CERT_TYPES, item => (
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
              initialValue: certification.title,
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
              initialValue: certification.status,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                {
                  _.map(REVERSED_CERT_STATUS, item => (
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
            getFieldDecorator('description', {
              initialValue: certification.description,
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
              initialValue: certification.required,
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
              initialValue: certification.reward,
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
              initialValue: certification.currency,
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
              initialValue: certification.validDays,
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

const BasicInfoForm = Form.create({
  mapPropsToFields: props => props,
})(BasicInfo);

BasicInfoForm.prototype.getBasicInfo = function getBasicInfo() {
  return this.getFieldsValue();
};

export default BasicInfoForm;

