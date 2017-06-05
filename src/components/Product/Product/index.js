import React, { Component } from 'react';
import { Table, Button, Icon, Modal, Message } from 'antd';
import { connect } from 'react-redux';

import { createProduct } from '../../../app/actions/product';
import CreateProductForm from './CreateProductForm';

class ProductList extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    products: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
  };
  static defaultProps = {
    products: {},
  };

  state = {
    visible: false,
  };

  handleEdit(product) {
    console.log(product);
  }

  handleCreateProduct = (data) => {
    const { dispatch } = this.props;
    dispatch(createProduct(data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建成功');
      }
    });
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
        dataIndex: 'quota',
        key: 'quota',
      },
      {
        title: '获得课时',
        dataIndex: 'hours',
        key: 'hours',
      },
      {
        title: '总销量',
        dataIndex: 'sales',
        key: 'sales',
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
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    products: {
      result: [
        {
          id: 27,
          name: '暑假团购课时',
          price: 148,
          quota: 1,
          hours: 12,
          sales: 40597,
          sum: 6008356,
        },
        {
          id: 28,
          name: '暑假团购课时',
          price: 148,
          quota: 1,
          hours: 12,
          sales: 40597,
          sum: 6008356,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(ProductList);
