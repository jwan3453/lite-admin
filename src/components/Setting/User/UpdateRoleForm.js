/**
 * 更新管理员角色表单
 * @author 陈翔宇
 */

import React from 'react';
import { Form, Button, Select } from 'antd';

import adminRoles from '../../../common/adminRoles';

const FormItem = Form.Item;
const Option = Select.Option;

const options = [];

adminRoles.forEach((item) => {
  options.push(<Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>);
});

class UpdateRoleForm extends React.Component {
  /**
   * 组件属性
   */
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
  };

  /**
   * 组件状态
   */
  state = {
    confirmDirty: false,
  };

  /**
   * 提交新角色
   * @param { object } 事件对象
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      roleId: this.props.form.getFieldsValue(['roleId']).roleId,
    });
  };

  /**
   * 渲染
   * @return { ReactDom } react 模板
   */
  render() {
    const { getFieldDecorator } = this.props.form;
    const { roleId } = this.props.user;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="用户角色">
          {getFieldDecorator('roleId', {
            initialValue: roleId.toString(),
            rules: [
              {
                required: true,
                message: '请选择角色',
              },
            ],
          })(<Select placeholder="请选择角色">{options}</Select>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create({
  mapPropsToFields: props => props,
})(UpdateRoleForm);
