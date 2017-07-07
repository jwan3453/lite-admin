import React from 'react';
import { Form, InputNumber, Input, Button } from 'antd';

import TeacherSearchInput from '../../Common/TeacherSearchInput';

const FormItem = Form.Item;

class BonusForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newBonus = {
          teacherId: values.teacherId,
          amount: values.amount,
          comment: values.remark,
        };
        this.props.onSubmit(newBonus);
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
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
      <div>
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="老师"
            {...formItemLayout}
          >
            {
              getFieldDecorator('teacherId', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<TeacherSearchInput />)
            }
          </FormItem>
          <FormItem
            label="金额"
            {...formItemLayout}
          >
            {
              getFieldDecorator('amount', {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<InputNumber size="default" min={0} style={{ width: '100%' }} />)
            }
          </FormItem>
          <FormItem
            label="备注"
            {...formItemLayout}
          >
            {
              getFieldDecorator('remark', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<Input type="textarea" rows={4} />)
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button
              size="default"
              style={{ marginLeft: 8 }}
              type="primary"
              htmlType="submit"
            >提交
            </Button>
          </FormItem>
        </Form>
      </div>
    )
      ;
  }
}

export default Form.create()(BonusForm);
