import React from 'react';
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';
import moment from 'moment';
import * as CERTIFICATION_STATUS from '../../../../common/teacherCertStatus';

const FormItem = Form.Item;
const TIME_FORMAT = 'YYYY-MM-DD';

class VideoConferenceForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    step: React.PropTypes.object,
  }

  static defaultProps = {
    step: {
      status: CERTIFICATION_STATUS.ASSIGNED,
      score: 0,
      time: 0,
    },
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };

    const { step } = this.props;

    return (
      <div>
        <Form>
          <FormItem
            label="状态"
            {...formItemLayout}
          >
            {
              getFieldDecorator('status', {
                initialValue: step.status,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Select>
                  {
                    [
                      {
                        value: CERTIFICATION_STATUS.ASSIGNED,
                        text: '已安排',
                      },
                      {
                        value: CERTIFICATION_STATUS.SUCCESSFUL,
                        text: '认证通过',
                      },
                      {
                        value: CERTIFICATION_STATUS.FAILED,
                        text: '认证失败',
                      },
                    ].map(item => (
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
            label="分数（满分100分）"
            {...formItemLayout}
          >
            {
              getFieldDecorator('score', {
                initialValue: step.score,
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<InputNumber min={0} max={100} style={{ width: '100%' }} />)
            }
          </FormItem>
          <FormItem
            label="session时间"
            {...formItemLayout}
          >
            {
              getFieldDecorator('time', {
                initialValue: moment(new Date(step.time), TIME_FORMAT),
                rules: [
                  {
                    required: false,
                  },
                ],
              })(<DatePicker showTime format={TIME_FORMAT} style={{ width: '100%' }} />)
            }
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(VideoConferenceForm);

