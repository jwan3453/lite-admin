import React from 'react';

import {
  Form,
  Input,
  Radio,
  Upload,
  Button,
  Icon,
  Modal,
  Tag,
  Tooltip,
} from 'antd';

import _ from 'lodash';

import AnswerForm from './AnswerForm';

const FormItem = Form.Item;

class ExamForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    exam: React.PropTypes.object,
  };

  static defaultProps = {
    exam: {
      title: '',
      desc: '',
      picture: '',
      sound: '',
      answer_picture: 0,
      answers: [],
    },
  };

  state = {
    answerDialogVisible: false,
  };

  render() {
    const { exam, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };

    const examDelIconStyle = {
      marginLeft: 8,
    };

    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange() {},
    };

    return (
      <Form>
        <FormItem
          label="题目"
          {...formItemLayout}
        >
          {
            getFieldDecorator('title', {
              initialValue: exam.title,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        <FormItem
          label="描述"
          {...formItemLayout}
        >
          {
            getFieldDecorator('desc', {
              initialValue: exam.desc,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={3} />)
          }
        </FormItem>
        <FormItem
          label="图片"
          {...formItemLayout}
        >
          {
            getFieldDecorator('picture', {
              initialValue: exam.picture,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Upload
                {...uploadProps}
              >
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>,
              )
          }
        </FormItem>
        <FormItem
          label="声音"
          {...formItemLayout}
        >
          {
            getFieldDecorator('sound', {
              initialValue: exam.sound,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Upload
                {...uploadProps}
              >
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>,
            )
          }
        </FormItem>
        <FormItem
          label="答案选项是否存在图片"
          {...formItemLayout}
        >
          {
            getFieldDecorator('answer_picture', {
              initialValue: exam.answer_picture,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Radio.Group>
                <Radio key="1" value={1}>是</Radio>
                <Radio key="0" value={0}>否</Radio>
              </Radio.Group>,
              )
          }
        </FormItem>
        <FormItem
          label="选项"
          {...formItemLayout}
        >
          {
            _.each(exam.answers, (item, index) => (
              <Tag
                key={item.id}
                onClick={() => { this.removeStepExam(index); }}
              >{item.title}
                <Tooltip title="删除">
                  <Icon
                    type="delete"
                    style={examDelIconStyle}
                  />
                </Tooltip>
              </Tag>
            ))
          }

          <Button
            size="small"
            type="dashed"
            icon="plus"
            onClick={() => {
              this.setState({
                answerDialogVisible: true,
              });
            }}
          >添加选项</Button>
        </FormItem>
        <Modal
          width={700}
          title="添加选项"
          okText="保存"
          cancelText="取消"
          onOk={() => {
            console.log('saving data...');
          }}
          onCancel={() => {
            this.setState({ answerDialogVisible: false });
          }}
          visible={this.state.answerDialogVisible}
        >
          <AnswerForm />
        </Modal>
      </Form>
    );
  }
}

export default Form.create()(ExamForm);

