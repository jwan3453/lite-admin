import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm,
  // Modal,
  Message,
} from 'antd';
import moment from 'moment';

import { fetchProductSimpleList } from '../../../app/actions/product';
import { fetchStudentProducts, gift } from '../../../app/actions/studentProduct';

class StudentProduct extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    studentId: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool.isRequired,
    // products: React.PropTypes.array.isRequired,
    // filters: React.prototype.object,
    studentProducts: React.PropTypes.object.isRequired,
  };

  state = {
    productVisible: false,
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchProductSimpleList());
    dispatch(fetchStudentProducts({}));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchStudentProducts({}));
    }
  }

  handleRefund = (product) => {
    //  todo handle refund
    console.log(product);
  };
  handleApplyGift = () => {
    this.setState({
      productVisible: true,
    });
  };
  handleGift = (productId, parentId) => {
    const { dispatch, studentId } = this.props;
    dispatch(gift(studentId, productId, parentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        dispatch();
      }
    });
  };

  render() {
    const {
      loading,
      studentProducts,
    } = this.props;

    const pagination = {
      current: studentProducts.page || 1,
      pageSize: studentProducts.pageSize || 10,
      total: studentProducts.total || 0,
    };

    const columns = [
      {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '总课时',
        key: 'totalHours',
        dataIndex: 'totalHours',
        render: hours => (hours.toFixed(1)),
      },
      {
        title: '可用课时',
        key: 'availableHours',
        dataIndex: 'availableHours',
        render: hours => (hours.toFixed(1)),
      },
      {
        title: '状态',
        key: 'status',
        render: (text, record) => {
          const { start, expiration } = record;
          const now = (new Date()).getTime();
          return !(now < start || now > expiration) ? '有效' : '已过期';
        },
      },
      {
        title: '有效期',
        key: 'availableTime',
        render: (text, record) => {
          const dateFormat = 'YYYY.MM.DD';
          return `${moment(new Date(record.start)).format(dateFormat)} - ${moment(new Date(record.expiration)).format(dateFormat)}`;
        },
      },
      {
        title: '退款金额',
        key: 'refund',
        dataIndex: 'refund',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <Popconfirm
            title="操作不可逆，确认继续？"
            onConfirm={() => this.handleRefund(record)}
          >
            <Button size="default" type="primary">申请退款</Button>
          </Popconfirm>
        ),
      },
    ];

    return (
      <div>
        <Table
          size="small"
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={studentProducts.result || []}
          pagination={pagination}
          title={() => (<Button
            size="small"
            icon="gift"
            onClick={this.handleApplyGift}
          >赠送课时</Button>)}
        />
      </div>
    );
  }
}


export default connect((state) => {
  const { product, studentProduct } = state;
  const { simpleList } = product;
  const { loading, manage } = studentProduct;
  const { filters, result } = manage;
  return {
    loading,
    filters,
    studentProducts: result,
    products: simpleList,
  };
})(StudentProduct);

