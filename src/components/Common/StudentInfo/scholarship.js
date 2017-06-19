import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Row,
  Col,
  Alert,
  Button,
  Message,
} from 'antd';
import moment from 'moment';
import { fetchScholarshipSummary, fetchScholarshipHistoryList, applyFirstShareWeixinScholarship } from '../../../app/actions/scholarship';

class Scholarship extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    summary: React.PropTypes.object,
    historyList: React.PropTypes.object,
    studentId: React.PropTypes.number.isRequired,
    filters: React.PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    summary: {},
    historyList: {},
    filters: {},
  };

  componentWillMount() {
    const { dispatch, loading, studentId } = this.props;
    if (!loading) {
      console.log(studentId);
      dispatch(fetchScholarshipSummary(studentId));
      dispatch(fetchScholarshipHistoryList(studentId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchScholarshipSummary(nextProps.studentId));
      dispatch(fetchScholarshipHistoryList(nextProps.studentId));
    }
  }

  handleChange = (pagination) => {
    const { dispatch, filters, studentId } = this.props;
    dispatch(
      fetchScholarshipHistoryList(studentId,
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  handleApplyFirstWeixinShareScholarship = () => {
    const { dispatch, studentId } = this.props;
    dispatch(applyFirstShareWeixinScholarship(studentId)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('首次微信分享奖学金');
        dispatch(fetchScholarshipSummary(studentId));
        dispatch(fetchScholarshipHistoryList(studentId));
      }
    });
  };

  render() {
    const {
      loading,
      summary,
      historyList,
    } = this.props;

    const pageSize = historyList.pageSize || 10;
    const dataSource = historyList.result || [];
    const pagination = {
      total: historyList.total || 0,
      pageSize,
      current: historyList.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };
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
        render: amount => amount / 100,
      },
      {
        title: '原因',
        key: 'awardTypeText',
        dataIndex: 'awardTypeText',
      },
      {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: createdAt => (moment.unix(createdAt).format('YYYY-MM-DD hh:mm:ss')),
      },
    ];

    return (
      <div>
        <Row gutter={16}>
          <Col span={5}>
            <Alert message={`总额 ${summary.totalGet / 100}`} type="info" />
          </Col>
          <Col span={5}>
            <Alert message={`剩余 ${summary.balance / 100}`} type="info" />
          </Col>
          <Col span={6}>
            <Alert message={`已兑换 ${summary.totalExchangedProduct} 课时`} type="info" />
          </Col>
          <Col span={6}>
            <Button
              size="large"
              icon="gift"
              disabled={summary.wxFirstShare}
              onClick={() => this.handleApplyFirstWeixinShareScholarship()}
            >赠送首次分享奖学金</Button>
          </Col>1
        </Row>
        <Table
          size="small"
          loading={loading}
          rowKey="id"
          columns={columns}
          pagination={pagination}
          dataSource={dataSource}
          style={{ marginTop: 16 }}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { scholarship } = state;
  return {
    loading: scholarship.loading,
    summary: scholarship.summary,
    historyList: scholarship.historyList.result,
    filters: scholarship.historyList.filters,
  };
}

export default connect(mapStateToProps)(Scholarship);

