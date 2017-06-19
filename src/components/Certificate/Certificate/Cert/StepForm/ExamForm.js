import React from 'react';

import {
  Form,
  Input,
  Radio,
  Upload,
  Button,
  Icon,
  Tag,
  Tooltip,
} from 'antd';

import _ from 'lodash';

import AnswerForm from './AnswerForm';

const FormItem = Form.Item;

const isAnswerIncludePicture = value => value === 1;

const getEmptyAnswer = () => _.assign({}, {
  title: '',
  picture: '',
  correct: 0,
});

class Exam extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    exam: React.PropTypes.object,
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    exam: {
      title: '',
      description: '',
      picture: '',
      sound: '',
      answer_picture: 0,
      answers: [],
    },
    onChange: () => {},
  };

  state = {
    currentAnswer: getEmptyAnswer(),
    currentAnswerIndex: -1,
    answerFormVisible: false,
  };

  onAnswerFormSubmit = () => {
    const answer = this.answerForm.getFieldsValue();

    const {
      currentAnswerIndex,
    } = this.state;

    const {
      exam,
      onChange,
    } = this.props;

    const { answers } = exam;

    const updating = currentAnswerIndex >= 0;

    if (!updating) {
      answers.push(answer);
    } else {
      const currentAnswer = _.assign(this.state.currentAnswer, answer);
      answers.splice(currentAnswerIndex, 1, currentAnswer);
    }

    onChange({
      answers,
    });

    this.hideAnswerForm();
  };

  createAnswer = () => {
    this.setState({
      currentAnswerIndex: -1,
      answerFormVisible: true,
      currentAnswer: getEmptyAnswer(),
    });
  };

  updateAnswer = (currentAnswerIndex) => {
    const { exam } = this.props;
    const currentAnswer = exam.answers[currentAnswerIndex];

    this.setState({
      currentAnswer,
      currentAnswerIndex,
      answerFormVisible: true,
    });
  };

  removeAnswer = (index) => {
    const {
      exam,
      onChange,
    } = this.props;

    const { answers } = exam;

    answers.splice(index, 1);

    onChange({
      answers,
    });
  };

  hideAnswerForm = () => {
    let index = -1;
    const { currentAnswerIndex } = this.state;
    if (currentAnswerIndex < 0) {
      index = currentAnswerIndex - 1;
    }

    this.setState({
      currentAnswerIndex: index,
      answerFormVisible: false,
    });
  };

  render() {
    const { exam, form } = this.props;
    const { getFieldDecorator } = form;

    const answersPicture = isAnswerIncludePicture((exam && exam.answer_picture) || 0);

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
      <div>
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
              getFieldDecorator('description', {
                initialValue: exam.description,
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
            label="答案"
            {...formItemLayout}
          >
            {
              _.map(exam.answers, (item, index) => (
                <Tag key={item.id}>
                  <Icon
                    style={{
                      color: item.correct === 1 ? 'green' : 'red',
                      marginRight: 8,
                    }}
                    type={item.correct === 1 ? 'check' : 'close'}
                  />
                  {item.title}
                  <Tooltip title="编辑">
                    <Icon
                      type="edit"
                      style={examDelIconStyle}
                      onClick={() => { this.updateAnswer(index); }}
                    />
                  </Tooltip>
                  <Tooltip title="删除">
                    <Icon
                      type="delete"
                      style={examDelIconStyle}
                      onClick={() => { this.removeAnswer(index); }}
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
                this.createAnswer();
              }}
            >添加选项</Button>
          </FormItem>
        </Form>
        <AnswerForm
          key={this.state.currentAnswerIndex}
          visible={this.state.answerFormVisible}
          answer={this.state.currentAnswer}
          answersPicture={answersPicture}
          ref={(node) => { this.answerForm = node; }}
          onSubmit={this.onAnswerFormSubmit}
        />
      </div>
    );
  }
}

const ExamForm = Form.create({
  onValuesChange: (props, values) => props.onChange(values),
})(Exam);

export default ExamForm;

