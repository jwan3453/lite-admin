import React from 'react';
import {
  Form,
  Input,
  Select,
} from 'antd';

import _ from 'lodash';

import LEVELS from '../../../common/levels';
import GROUP_STATUS from './status';

const FormItem = Form.Item;

class GroupInfo extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    group: React.PropTypes.object,
  };

  static defaultProps = {
    group: {
      name: '',
      level: '',
      status: '',
      comment: '',
    },
  };

  render() {
    const { group, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    return (
      <Form>
        <FormItem
          label="分组名称"
          {...formItemLayout}
        >
          {
            getFieldDecorator('name', {
              initialValue: group.name,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="分组名称" />)
          }
        </FormItem>
        <FormItem
          label="课程级别"
          {...formItemLayout}
        >
          {
            getFieldDecorator('level', {
              initialValue: group.level,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select>
                {
                  _.map(
                    LEVELS,
                    item => (
                      <Select.Option
                        key={item.value}
                        value={item.value}
                      >{item.name}</Select.Option>
                    ),
                  )
                }
              </Select>,
            )
          }
        </FormItem>
        <FormItem
          label="状态"
          {...formItemLayout}
        >
          {
            getFieldDecorator('status', {
              initialValue: group.status,
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select>
                {
                  _.map(
                    GROUP_STATUS,
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
        <FormItem
          label="备注"
          {...formItemLayout}
        >
          {
            getFieldDecorator('comment', {
              initialValue: group.comment,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input type="textarea" rows={4} />)
          }
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(GroupInfo);

