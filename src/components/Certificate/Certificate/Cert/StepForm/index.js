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

class StepForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    step: React.PropTypes.object,
  };

  static defaultProps = {
    step: {
      title: '',
      timeLimit: 0,
      type: 'tests',
      comment: '',
    },
  };

  state = {
    fileList: [],
    examDialogVisible: false,
  };

  upload = ({ fileList }) => this.setState({ fileList });

  render() {
    const {
      step,
      form,
    } = this.props;

    const { getFieldDecorator } = form;

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
            getFieldDecorator('comment', {
              initialValue: step.comment,
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
                  _.map(CERT_STEP_TYPE.default, item => (
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
                <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Upload.Dragger>
            </FormItem>
            )
          : null
        }
        {
          (
            CERT_STEP_TYPE.isPracticeStep(stepType)
          )
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
          (
            CERT_STEP_TYPE.isTestsStep(stepType)
            ? (
              <FormItem
                label="测试题"
                {...formItemLayout}
              >
                {
                  _.each(exams, (item, index) => (
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
                      examDialogVisible: true,
                    });
                  }}
                >添加题目</Button>
              </FormItem>
              )
            : null
          )
        }
        {
          CERT_STEP_TYPE.isTestsStep(stepType)
          ? (
            <Modal
              width={700}
              title="测试题目1"
              okText="保存"
              cancelText="取消"
              onOk={() => { console.log('saving data...'); }}
              onCancel={() => { this.setState({ examDialogVisible: false }); }}
              visible={this.state.examDialogVisible}
            >
              <ExamForm />
            </Modal>
            )
          : null
        }
      </Form>
    );
  }
}

export default Form.create()(StepForm);

