import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Tag,
  Tooltip,
  Popconfirm,
  Message,
} from 'antd';
import moment from 'moment';
import SearchForm from './SearchForm';
import {
  TYPE_MAP as BONUS_TYPE_MAP,
  SYSTEM as BONUS_TYPE_SYSTEM,
} from '../../../../common/bonusTypes';
import {
  STATUS_MAP as BONUS_STATUS_MAP,
  FAILED as BONUS_CANCELLED,
  CREATED as BONUS_CREATED,
} from '../../../../common/bonusStatus';
import {
  searchTeacherBonuses,
  changeTeacherBonusStatus,
  recalculateTeacherBonus,
} from '../../../../app/actions/teacherBonus';

class Bonus extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    bonus: React.PropTypes.object,
    loading: React.PropTypes.bool.isRequired,
    teacherId: React.PropTypes.number.isRequired,
    filters: React.PropTypes.object,

  };
  static defaultProps = {
    bonus: [],
    loading: false,
    filters: {},
  };

  componentWillMount() {
    const { dispatch, loading, filters, teacherId } = this.props;
    if (!loading) {
      dispatch(searchTeacherBonuses(Object.assign(filters, { teacherId })));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, teacherId, filters } = this.props;
    if (nextProps.teacherId > 0 && nextProps.teacherId !== teacherId) {
      dispatch(searchTeacherBonuses(Object.assign(filters, { teacherId: nextProps.teacherId })));
    }
  }
  handleSearch = (filters) => {
    const { dispatch } = this.props;
    delete this.props.filters.status;
    delete this.props.filters.awardType;
    delete this.props.filters.startDate;
    delete this.props.filters.endDate;
    dispatch(searchTeacherBonuses(Object.assign(this.props.filters, { ...filters })));
  };

  cancelBonus = (bonusId) => {
    const { dispatch } = this.props;
    dispatch(changeTeacherBonusStatus(bonusId, { status: BONUS_CANCELLED })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('取消成功');
        dispatch(searchTeacherBonuses(this.props.filters));
      }
    });
  };

  recalcBonus = (record) => {
    const { dispatch } = this.props;

    const data = {
      teacherId: this.props.teacherId,
      fromTime: record.fromTime,
      toTime: record.toTime,
      type: record.awardType,
    };
    // 首先在bonus删除这条记录
    dispatch(changeTeacherBonusStatus(record.id, { status: BONUS_CANCELLED })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
       // 重新计算奖金
        dispatch(recalculateTeacherBonus(data)).then((res) => {
          if (res.code) {
            Message.error(res.message);
          } else {
            Message.info('重新计算成功');
            dispatch(searchTeacherBonuses(this.props.filters));
          }
        });
      }
    });
  };

  handleChange = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchTeacherBonuses(Object.assign(filters, {
        page: pagination.current,
        pageSize: pagination.pageSize,
      }),
      ),
    );
  }

  render() {
    const {
      loading,
      bonus,
    } = this.props;
    const { total, pageSize, page } = bonus;
    const pagination = {
      total,
      pageSize,
      current: page,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };
    const columns = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
      },
      {
        title: '金额',
        key: 'amount',
        dataIndex: 'amount',
      },
      {
        title: '奖励类型',
        key: 'type',
        dataIndex: 'awardType',
        render: awardType => BONUS_TYPE_MAP[awardType].text,
      },
      {
        title: '时间',
        key: 'ctime',
        dataIndex: 'createdAt',
        render: ctime => moment.unix(ctime).format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        render: (status) => {
          const currentStatus = BONUS_STATUS_MAP[status];

          return (
            <Tag
              color={currentStatus.color}
            >{currentStatus.text}</Tag>
          );
        },
      },
      {
        title: '备注',
        key: 'comment',
        dataIndex: 'comment',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => {
          const showActionButtons = record.status === BONUS_CREATED;
          const showRecalulate = record.awardType === BONUS_TYPE_SYSTEM;
          return !showActionButtons ? null
            : (
              <div>
                <Popconfirm
                  title="该操作不可逆，确定执行？"
                  onConfirm={() => this.recalcBonus(record)}
                >
                  <Tooltip
                    placement="top"
                    title="重新计算"
                  >
                    <Button icon="calculator" style={{ marginRight: 8 }} disabled={showRecalulate} />
                  </Tooltip>
                </Popconfirm>
                <Popconfirm
                  title="该操作不可逆，确定执行？"
                  onConfirm={() => this.cancelBonus(record.id)}
                >
                  <Tooltip
                    placement="top"
                    title="取消奖金"
                  >
                    <Button icon="close" />
                  </Tooltip>
                </Popconfirm>
              </div>
            );
        },
      },
    ];

    return (
      <div>
        <SearchForm onSearch={this.handleSearch} />
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={bonus.result}
          pagination={pagination}
          onChange={this.handleChange}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { teacherBonus } = state;
  const { filters, result } = teacherBonus;
  return {
    filters,
    bonus: result,
  };
}

export default connect(mapStateToProps)(Bonus);

