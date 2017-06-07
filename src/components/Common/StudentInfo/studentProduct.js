import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm,
  Tooltip,
  Modal,
  Message,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';

import {
  STUDENT_PRODUCT_STATUS,
  STUDENT_PRODUCT_STATUS_NORMAL,
} from '../../../common/studentProduct';

import { fetchProductSimpleList } from '../../../app/actions/product';
import { fetchStudentProducts, giftStudentProduct } from '../../../app/actions/studentProduct';

import GiftProductForm from '../GiftProductForm';

class StudentProduct extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    studentId: React.PropTypes.number.isRequired,
    loading: React.PropTypes.bool.isRequired,
    products: React.PropTypes.array.isRequired,
    filters: React.PropTypes.object.isRequired,
    studentProducts: React.PropTypes.object.isRequired,
  };

  state = {
    studentProductId: 0,
    giftVisible: false,
  };

  componentWillMount() {
    const { dispatch, studentId } = this.props;
    dispatch(fetchProductSimpleList());
    dispatch(fetchStudentProducts(studentId, {}));
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchStudentProducts(nextProps.studentId, {}));
    }
  }

  expandRowRender = record =>
    (<p>
      共{record.lessonCount}课时，
      包含赠送{record.givenLessonCount}课时，
      赔偿{record.compensationLessonCount}课时，<br />
      共消耗{record.consumedCount}课时，
      剩余{record.lessonCountLeft}课时
    </p>);

  handleRefund = (product) => {
    //  todo handle refund
    console.log(product);
  };
  handleApplyGift = (studentProductId) => {
    this.setState({
      studentProductId,
      giftVisible: true,
    });
  };
  handleGiftSubmit = (giftProduct) => {
    const { dispatch, studentId, filters } = this.props;
    dispatch(giftStudentProduct(studentId, giftProduct)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        dispatch(fetchStudentProducts(studentId, filters));
      }
    });
  };

  render() {
    const {
      loading,
      studentProducts,
      products,
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
        key: 'lessonCount',
        dataIndex: 'lessonCount',
      },
      {
        title: '可用课时',
        key: 'lessonCountLeft',
        dataIndex: 'lessonCountLeft',
      },
      {
        title: '状态',
        key: 'status',
        render: (record) => {
          const status = _.find(STUDENT_PRODUCT_STATUS, { value: Number(record.status) });
          if (status) {
            if (record.status === STUDENT_PRODUCT_STATUS_NORMAL) {
              if (moment().isBefore(moment.unix(record.validStartAt))) {
                return '未开始';
              }
              if (moment().isAfter(moment.unix(record.validFinishedAt))) {
                return '已过期';
              }
            }
            return status.text;
          }
          return record.status;
        },
      },
      {
        title: '有效期',
        key: 'availableTime',
        render: (record) => {
          const dateFormat = 'YYYY.MM.DD';
          return `${moment.unix(record.validStartAt).format(dateFormat)} - ${moment.unix(record.validFinishAt).format(dateFormat)}`;
        },
      },
      {
        title: '操作',
        key: 'actions',
        render: record => (
          <div>
            <Popconfirm
              title="操作不可逆，确认继续？"
              onConfirm={() => this.handleRefund(record)}
            >
              <Tooltip title="申请退款">
                <Button
                  size="small"
                  type="primary"
                  ghost
                  icon="wallet"
                  style={{ marginRight: 5 }}
                />
              </Tooltip>
            </Popconfirm>
            <Tooltip title="赠送关联产品">
              <Button
                size="small"
                type="primary"
                ghost
                icon="gift"
                onClick={() => this.handleApplyGift(record.id)}
              />
            </Tooltip>
          </div>
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
          expandedRowRender={this.expandRowRender}
          dataSource={studentProducts.result || []}
          pagination={pagination}
          title={() => (<Button
            size="small"
            icon="gift"
            onClick={() => this.handleApplyGift(0)}
          >赠送课时</Button>)}
        />
        <Modal
          title="赠送课时"
          visible={this.state.giftVisible}
          footer={null}
          onCancel={() => this.setState({ giftVisible: false })}
        >
          <GiftProductForm
            products={products}
            onSubmit={this.handleGiftSubmit}
            parent={this.state.studentProductId}
          />
        </Modal>
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

