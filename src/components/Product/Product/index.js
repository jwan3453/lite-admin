import React, { Component } from 'react';
import { Table, Button, Icon, Modal, Message } from 'antd';
import { connect } from 'react-redux';

import { createProduct, updateProduct, manageProducts } from '../../../app/actions/product';
import CreateProductForm from './CreateProductForm';
import UpdateProductForm from './UpdateProductForm';

class ProductList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    products: React.PropTypes.object,
    filters: React.PropTypes.object,
  };
  static defaultProps = {
    products: {},
    filters: {},
  };

  state = {
    visible: false,
    updateFormVisible: false,
    currentProduct: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(manageProducts());
  }

  handleEdit(product) {
    this.setState({ currentProduct: product, updateFormVisible: true });
  }

  handleCreateProduct = (data) => {
    const { dispatch } = this.props;
    dispatch(createProduct(data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建成功');
        dispatch(manageProducts());
      }
    });
  };

  handleUpdateProduct = (data) => {
    const { dispatch } = this.props;
    const product = this.state.currentProduct;
    dispatch(updateProduct(product.id, data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('修改成功');
        dispatch(manageProducts());
      }
    });
  }

  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      manageProducts(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  render() {
    const { products } = this.props;
    const pageSize = products.pageSize || 10;
    const dataSource = products.result || [];
    const pagination = {
      total: products.total || 0,
      pageSize,
      current: products.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
      },
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '产品单价',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: '限购数量',
        dataIndex: 'maxBuyLimit',
        key: 'maxBuyLimit',
      },
      {
        title: '获得课时',
        dataIndex: 'lessonCount',
        key: 'lessonCount',
      },
      {
        title: '总销量',
        dataIndex: 'totalSale',
        key: 'totalSale',
      },
      {
        title: '总金额',
        dataIndex: 'sum',
        key: 'sum',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <Button icon="edit" onClick={() => this.handleEdit(record)} />
        ),
      },
    ];

    return (
      <div>
        <Button
          ghost
          type="primary"
          size="default"
          onClick={() => this.setState({ visible: true })}
        >
          <Icon type="plus" />
          新增产品
        </Button>
        <Table
          loading={this.props.loading}
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={pagination}
          onChange={this.handleChange}
        />
        <Modal
          maskClosable={false}
          visible={this.state.visible}
          title="新增产品"
          footer={null}
          onCancel={() => this.setState({ visible: false })}
        >
          <CreateProductForm
            products={this.props.products.result}
            onSubmit={this.handleCreateProduct}
          />
        </Modal>
        <Modal
          maskClosable={false}
          visible={this.state.updateFormVisible}
          title="修改产品"
          footer={null}
          onCancel={() => this.setState({ updateFormVisible: false })}
        >
          <UpdateProductForm
            products={this.props.products.result}
            product={this.state.currentProduct}
            onSubmit={this.handleUpdateProduct}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { product } = state;
  return {
    products: product.manage.result,
    filters: product.manage.filters,
    loading: product.loading,
  };
}

export default connect(mapStateToProps)(ProductList);
