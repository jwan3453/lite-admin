/**
 * Created by chenlingguang on 2017/6/7.
 */
import React, { Component } from 'react';
import { Form, Select, Button, Input, Radio } from 'antd';
import _ from 'lodash';

class GiftProductForm extends Component {
  static propTypes = {
    products: React.PropTypes.array.isRequired,
    form: React.PropTypes.object.isRequired,
    parent: React.PropTypes.number,
    onSubmit: React.PropTypes.func.isRequired,
  };

  static defaultProps = {
    parent: 0,
  };

  state = {
    productId: 0,
    needPayInfo: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const giftProduct = {
          productId: values.productId,
          parent: values.parent,
          productAmount: values.productAmount,
          payChannel: values.payChannel,
          payInfo: JSON.stringify({
            name: values.payerName,
            account: values.payerAccount,
          }),
        };
        this.props.onSubmit(giftProduct);
      }
    });
  };
  handleGiftChange = (productId) => {
    const giftProduct = _.find(this.props.products, { id: productId });
    const needPayInfo = giftProduct && giftProduct.price > 0;
    this.props.form.resetFields();
    this.setState({
      productId,
      needPayInfo,
    });
  };

  render() {
    const { products, form, parent } = this.props;
    const { needPayInfo } = this.state;
    const { getFieldDecorator } = form;

    const giftProducts = products.filter(product =>
      product.buyingType === 0 && product.parent === 0);
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
    const payInfoStyle = {
      display: this.state.needPayInfo ? 'block' : 'none',
    };
    return (<Form
      onSubmit={this.handleSubmit}
    >
      <Form.Item
        label="赠送产品"
        {...formItemLayout}
      >
        {getFieldDecorator('productId', {
          rules: [
            {
              required: true,
              message: 'Please select gift product',
            },
          ],
        })(
          <Select onChange={this.handleGiftChange}>
            {giftProducts.map(gift => (<Select.Option
              key={gift.id}
              value={String(gift.id)}
            >
              {gift.name}
            </Select.Option>))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item
        label="关联课时包"
        {...formItemLayout}
      >
        {getFieldDecorator('parent', {
          initialValue: parent,
        })(<Input disabled />)}
      </Form.Item>
      <Form.Item
        label="数量"
        {...formItemLayout}
      >
        {getFieldDecorator('productAmount', {
          initialValue: 1,
          rules: [
            {
              required: true,
              message: 'Please input amount',
            },
          ],
        })(<Input type="number" disabled={needPayInfo} />)}
      </Form.Item>
      <Form.Item
        label="支付渠道"
        {...formItemLayout}
        style={payInfoStyle}
      >
        {getFieldDecorator('payChannel', {
          initialValue: 'alipay',
        })(
          <Radio.Group>
            <Radio value="alipay">支付宝</Radio>
            <Radio value="bank">银行卡</Radio>
          </Radio.Group>,
        )}
      </Form.Item>
      <Form.Item
        label="支付姓名"
        {...formItemLayout}
        style={payInfoStyle}
      >
        {getFieldDecorator('payerName', {
          rules: [
            {
              required: this.state.needPayInfo,
              message: 'Please input payer name',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item
        label="支付账号"
        {...formItemLayout}
        style={payInfoStyle}
      >
        {getFieldDecorator('payAccount', {
          rules: [
            {
              required: this.state.needPayInfo,
              message: 'Please input payer account',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" size="large">赠送课时</Button>
      </Form.Item>
    </Form>);
  }
}

export default Form.create()(GiftProductForm);
