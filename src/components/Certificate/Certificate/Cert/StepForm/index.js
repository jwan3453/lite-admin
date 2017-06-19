import React from 'react';
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  Icon,
  Upload,
  message,
  Modal,
  Tag,
  Tooltip,
} from 'antd';

import _ from 'lodash';

import ExamForm from './ExamForm';

import * as CERT_STEP_TYPE from '../../../../../common/certificationStepTypes';

const FormItem = Form.Item;

const CERT_STEP_TYPES = CERT_STEP_TYPE.default;

const getEmptyExam = () => _.assign({}, {
  title: '',
  description: '',
  picture: '',
  sound: '',
  answer_picture: 0,
  answers: [],
});

class StepForm extends React.Component {
  static propTypes = {
    step: React.PropTypes.object.isRequired,
    form: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    step: {
      title: '',
      timeLimit: 0,
      type: '',
      description: '',
    },
    onChange: () => {},
  };

  state = {
    fileList: [],
    examDialogVisible: false,
    currentExam: getEmptyExam(),
    currentExamIndex: -1,
  };

  onExamFormChange = (values) => {
    const { currentExam } = this.state;

    this.setState({
      currentExam: _.assign(currentExam, values),
    });
  };

  createStepExam = (closeDialog = true) => {
    const exam = this.state.currentExam;
    const {
      form,
      step,
      onChange,
    } = this.props;

    step.exams.push(exam);

    onChange(form.getFieldsValue(), step.exams);

    if (closeDialog) {
      this.hideExamDialog();
    }
  };

  updateStepExam = (closeDialog = true) => {
    const {
      currentExam,
      currentExamIndex,
    } = this.state;

    const exam = _.assign(currentExam, this.examForm.getFieldsValue());

    const {
      step,
      form,
      onChange,
    } = this.props;

    step.exams.splice(currentExamIndex, 1, exam);

    onChange(form.getFieldsValue(), step.exams);

    if (closeDialog) {
      this.hideExamDialog();
    }
  };

  removeStepExam = (index) => {
    const {
      form,
      step,
      onChange,
    } = this.props;

    const exams = step.exams;

    exams.splice(index, 1);

    onChange(form.getFieldsValue(), exams);
  };

  showExamDialog = (exam = getEmptyExam(), index = -1) => {
    this.setState({
      examDialogVisible: true,
      currentExam: exam,
      currentExamIndex: index,
    });
  };

  hideExamDialog = () => {
    const { currentExamIndex } = this.state;

    let index = -1;
    if (currentExamIndex < 0) {
      index = currentExamIndex - 1;
    }

    this.setState({
      examDialogVisible: false,
      currentExam: getEmptyExam(),
      currentExamIndex: index,
    });
  };

  uploadFile = ({ fileList }) => this.setState({ fileList });

  render() {
    const {
      currentExam,
      currentExamIndex,
      examDialogVisible,
    } = this.state;

    const { step } = this.props;

    const { getFieldDecorator } = this.props.form;

    const stepType = step.type;

    const exams = !CERT_STEP_TYPE.isTestsStep(stepType) ? [] : step.exams;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

    const examDelIconStyle = {
      marginLeft: 8,
    };

    const draggerProps = {
      name: 'file',
      multiple: false,
      showUploadList: false,
      action: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    if (CERT_STEP_TYPE.isPPTStep(stepType)) {
      draggerProps.accept = '.ppt,.pptx,.pdf';
    }

    if (CERT_STEP_TYPE.isVideoStep(stepType)) {
      draggerProps.accept = 'video/*';
    }

    return (
      <Form>
        <FormItem
          label="步骤标题"
          {...formItemLayout}
        >
          {
            getFieldDecorator('title', {
              initialValue: step.title,
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="步骤标题" />)
          }
        </FormItem>
        <FormItem
          label="描述"
          {...formItemLayout}
        >
          {
            getFieldDecorator('description', {
              initialValue: step.description,
              rules: [
                {
                  required: false,
                },
              ],
            })(<Input type="textarea" rows={4} />)
          }
        </FormItem>
        <FormItem
          label="类型"
          {...formItemLayout}
        >
          {
            getFieldDecorator('type', {
              initialValue: step.type,
              rules: [
                {
                  required: false,
                },
              ],
            })(
              <Select>
                {
                  _.map(CERT_STEP_TYPES, item => (
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
          label="时间限制"
          help="完成时间限制(单位为秒，0为不限)"
          {...formItemLayout}
        >
          {
            getFieldDecorator('timeLimit', {
              initialValue: step.timeLimit,
              rules: [
                {
                  required: false,
                },
              ],
            })(<InputNumber min={0} style={{ width: '100%' }} />)
          }
        </FormItem>
        {
          (
            CERT_STEP_TYPE.isPPTStep(stepType)
            || CERT_STEP_TYPE.isVideoStep(stepType)
          )
          ? (
            <FormItem
              label="上传文件"
              {...formItemLayout}
            >
              <Upload.Dragger {...draggerProps}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Upload.Dragger>
            </FormItem>
            )
          : null
        }
        {
          CERT_STEP_TYPE.isPracticeStep(stepType)
          ? (
            <FormItem
              label="房间ID"
              {...formItemLayout}
            >
              {
                getFieldDecorator('roomId', {
                  rules: [
                    {
                      required: true,
                    },
                  ],
                })(<Input placeholder="房间ID" />)
              }
            </FormItem>
            )
          : null
        }
        {
          CERT_STEP_TYPE.isTestsStep(stepType)
          ? (
            <FormItem
              label="测试题"
              {...formItemLayout}
            >
              {
                _.map(exams, (item, index) => (
                  <Tag key={item.id}>{item.title}
                    <Tooltip title="编辑">
                      <Icon
                        type="edit"
                        style={examDelIconStyle}
                        onClick={() => { this.showExamDialog(item, index); }}
                      />
                    </Tooltip>
                    <Tooltip title="删除">
                      <Icon
                        type="delete"
                        style={examDelIconStyle}
                        onClick={() => { this.removeStepExam(index); }}
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
                  this.showExamDialog();
                }}
              >添加题目</Button>
            </FormItem>
            )
          : null
        }
        {
          CERT_STEP_TYPE.isTestsStep(stepType)
          ? (
            <Modal
              width={700}
              key={currentExamIndex}
              title={
                currentExamIndex < 0
                ? '添加题目'
                : '编辑题目'
              }
              okText="保存"
              cancelText="取消"
              onOk={
                currentExamIndex < 0
                ? this.createStepExam
                : this.updateStepExam
              }
              onCancel={this.hideExamDialog}
              visible={examDialogVisible}
            >
              <ExamForm
                key={currentExamIndex}
                exam={currentExam}
                ref={(node) => { this.examForm = node; }}
                onChange={this.onExamFormChange}
              />
            </Modal>
            )
          : null
        }
      </Form>
    );
  }
}

export default Form.create({
  onValuesChange: (props, values) => props.onChange(values),
  mapPropsToFields: props => props,
})(StepForm);

