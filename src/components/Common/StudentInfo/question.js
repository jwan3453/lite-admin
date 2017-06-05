import React from 'react';
import {
  Spin,
  Form,
  Select,
  Modal,
} from 'antd';

const FormItem = Form.Item;
const SelectOption = Select.Option;

class Question extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    form: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    loading: false,
  };

  render() {
    const {
      loading,
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const { getFieldDecorator } = this.props.form;

    const questions = [
      [
        '孩子在学校学了几年英语？',
        '1年',
      ],
      [
        '孩子在学校学了几年英语？',
        '1年',
      ],
      [
        '孩子在学校学了几年英语？',
        '1年',
      ],
      [
        '孩子在学校学了几年英语？',
        '1年',
      ],
    ];

    return (
      <Spin
        spinning={loading}
      >
        <Form>
          <FormItem
            label="课程级别"
            {...formItemLayout}
          >
            {
              getFieldDecorator('level', {
                rulesL: [
                  {
                    required: false,
                  },
                ],
              })(
                <Select>
                  <SelectOption key="1" value="1">G1</SelectOption>
                  <SelectOption key="5" value="5">G2</SelectOption>
                </Select>,
              )
            }
          </FormItem>
          <FormItem
            label="分级问卷"
            {...formItemLayout}
          >
            {
              questions.length > 0
              ? questions.map(item => (
                <div>
                  <div>Q：{item[0]}</div>
                  <div>A：{item[1]}</div>
                </div>
              ))
              : (<div>暂时没有问卷调查数据哦！</div>)
            }
          </FormItem>
        </Form>
      </Spin>
    );
  }
}

export default Form.create({
  onFieldsChange: (props, fields) => {
    if (fields.level) {
      Modal.confirm({
        title: '确认修改级别',
        content: '确认修改级别？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          console.log('this is on ok');
        },
      });
    }
  },
})(Question);

