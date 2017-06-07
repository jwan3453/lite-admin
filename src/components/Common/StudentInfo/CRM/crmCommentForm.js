import React from 'react';
import {
  Form,
  Input,
  Icon,
} from 'antd';

const FormItem = Form.Item;

class CreateCommentForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };

    return (
      <Form>
        <FormItem
          label="用户备注"
          {...formItemLayout}
        >
          {
            getFieldDecorator('comment', {
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={5} />)
          }
          <p><Icon type="info-circle" style={{ color: '#108ee9', marginRight: 8 }} />将用户设置到此跟进状态，若不选择，将不更新用户的状态。</p>
          <p><Icon type="info-circle" style={{ color: '#108ee9', marginRight: 8 }} />若只想更新用户的跟进状态，该备注可以不填。</p>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CreateCommentForm);

