import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Alert,
} from 'antd';
import moment from 'moment';

const STATUS_ACTIVATED = 2;

class Scholarship extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool,
    summary: React.PropTypes.object,
    scholarships: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    summary: {},
    scholarships: [],
  };

  render() {
    const {
      loading,
      summary,
      scholarships,
    } = this.props;

    const columns = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '奖学金',
        key: 'amount',
        dataIndex: 'amount',
        render: amount => amount.toFixed(2),
      },
      {
        title: '原因',
        key: 'reason',
        dataIndex: 'reason',
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: status => (status !== STATUS_ACTIVATED ? '未激活' : '已激活'),
      },
      {
        title: '创建时间',
        key: 'ctime',
        dataIndex: 'ctime',
        render: ctime => (moment(new Date(ctime)).format('YYYY-MM-DD hh:mm:ss')),
      },
    ];

    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Alert message={`总额 ${summary.total.toFixed(2)}`} type="info" />
          </Col>
          <Col span={8}>
            <Alert message={`剩余 ${summary.left.toFixed(2)}`} type="info" />
          </Col>
          <Col span={8}>
            <Alert message={`已兑换 ${summary.used} 课时`} type="info" />
          </Col>
        </Row>
        <Table
          size="small"
          loading={loading}
          rowKey="id"
          columns={columns}
          pagination={false}
          dataSource={scholarships}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    summary: {
      total: 0,
      left: 0,
      used: 0,
    },
    scholarships: [
      {
        id: 0,
        amount: 0.8,
        reason: '课后评价',
        status: 0,
        ctime: 1495616775000,
      },
      {
        id: 1,
        amount: 0.71,
        reason: '课后评价',
        status: 0,
        ctime: 1495616773000,
      },
    ],
  };
}

export default connect(mapStateToProps)(Scholarship);

