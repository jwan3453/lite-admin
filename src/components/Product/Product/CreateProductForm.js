import _ from 'lodash';
import React from 'react';
import {
  Form,
  InputNumber,
  Radio,
  DatePicker,
  Select,
  Button,
  Input,
} from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const LESSON_VALIDITY_LIFE_TIME = '0';
const LESSON_VALIDITY_START_END = '1';

class CreateProductForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    products: React.PropTypes.array,
    onSubmit: React.PropTypes.func.isRequired,
  };
  static defaultProps = {
    products: [],
  };
  state = {
    confirmDirty: false,
    lessonValidityType: '0',
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const product = _.omit(values, [
        'buyingRange',
        'lessonTimeRange',
        'lessonLifeTime',
      ]);
      if (values.lessonValidityType === LESSON_VALIDITY_LIFE_TIME) {
        product.lessonLifeTime = values.lessonLifeTime;
      }

      if (values.lessonValidityType === LESSON_VALIDITY_START_END) {
        product.lessonStartDate = values.lessonTimeRange[0].format(dateFormat);
        product.lessonEndDate = values.lessonTimeRange[1].format(dateFormat);
      }

      if (values.buyingRange) {
        product.buyingStartDate = values.buyingRange[0].format(dateFormat);
        product.buyingEndDate = values.buyingRange[1].format(dateFormat);
      }

      this.props.onSubmit(product);
    });
  };

  handleLessonValidityTypeChange = (e) => {
    console.log(e.target.value);
    this.setState({ lessonValidityType: e.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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

    const products = this.props.products || [];
    const children = products.map(product => (
      <Select.Option key={product.id} value={`${product.id}`}>
        {product.name}
      </Select.Option>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label="产品名称">
          {getFieldDecorator('name', {
            initialValue: '',
            rules: [{ required: true }],
          })(<Input size="large" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="产品价格">
          {getFieldDecorator('price', {
            initialValue: 0,
            rules: [{ required: true }],
          })(<InputNumber min={0} size="large" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="课时数">
          {getFieldDecorator('lessonCount', {
            initialValue: 1,
            rules: [{ required: true }],
          })(<InputNumber min={1} size="large" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="限购数量">
          {getFieldDecorator('maxBuyLimit', {
            initialValue: 1,
            rules: [{ required: false }],
          })(<InputNumber min={0} size="large" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="归属产品">
          {getFieldDecorator('parent', {
            initialValue: '0',
            rules: [{ required: false }],
          })(
            <Select size="large">
              <Select.Option key="0" value="0">无</Select.Option>
              {children}
            </Select>,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="互斥产品">
          {getFieldDecorator('rejectIds', {
            initialValue: [],
            rules: [{ required: false }],
          })(
            <Select size="large" mode="multiple">
              {children}
            </Select>,
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="活动类型">
          {getFieldDecorator('buyingType', {
            initialValue: 0,
            rules: [{ required: false }],
          })(<InputNumber min={0} size="large" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="活动时间">
          {getFieldDecorator('buyingRange', {
            rules: [{ required: false }],
          })(<RangePicker format="YYYY-MM-DD" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="扣课优先级">
          {getFieldDecorator('lessonConsumePriority', {
            initialValue: 0,
            rules: [{ required: true }],
          })(<InputNumber min={0} size="large" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="有效期类型">
          {getFieldDecorator('lessonValidityType', {
            initialValue: '0',
            rules: [{ required: true }],
          })(
            <Radio.Group onChange={this.handleLessonValidityTypeChange}>
              <Radio value="0">从购买开始计算</Radio>
              <Radio value="1">固定起止时间</Radio>
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="有效时长(天)"
          style={{
            display: this.state.lessonValidityType === '0' ? 'block' : 'none',
          }}
        >
          {getFieldDecorator('lessonLifeTime', {
            initialValue: 30,
            rules: [{ required: false }],
          })(<InputNumber min={1} max={1460} size="large" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="起止时间"
          style={{
            display: this.state.lessonValidityType === '1' ? 'block' : 'none',
          }}
        >
          {getFieldDecorator('lessonTimeRange', {
            rules: [{ required: false }],
          })(<RangePicker format="YYYY-MM-DD" />)}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large">提交</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CreateProductForm);
