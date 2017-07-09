import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Tag,
  Tooltip,
  Popconfirm,
  Modal,
  Message,
} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import SearchForm from './SearchForm';
import BonusForm from './BonusForm';

import {
  createTeacherBonuses,
  searchTeacherBonuses,
  changeTeacherBonusStatus,
} from '../../../app/actions/teacherBonus';
import { getSimpleList } from '../../../app/actions/teacher';

import {
  TYPE_MAP as BONUS_TYPE_MAP,
} from '../../../common/bonusTypes';
import {
  STATUS_MAP as TEACHER_STATUS_MAP,
} from '../../../common/teacherStatus';
import {
  STATUS_MAP as BONUS_STATUS_MAP,
  FAILED as BONUS_CANCELLED,
} from '../../../common/bonusStatus';

class Bonus extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    teacherBonusData: React.PropTypes.object.isRequired,
    teachers: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object,
  };
  static defaultProps = {
    teacherBonusData: {},
    filters: {},
    teachers: [],
  };

  state = {
    dialogVisible: false,
    loading: false,
    teacherBonusData: {},
  };

  cancelBonus = (bonusId) => {
    const { dispatch } = this.props;
    dispatch(changeTeacherBonusStatus(bonusId, { status: BONUS_CANCELLED })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('取消成功');
        this.searchBonuses(this.props.filters);
      }
    });
  };

  recalcBonus = () => {
    //  todo
  };

  createBonus = (data) => {
    const { dispatch } = this.props;
    dispatch(createTeacherBonuses(data)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('创建成功');
        this.setState({ dialogVisible: false });
      }
    });
  };

  handleSearch = (filters) => {
    this.searchBonuses(filters);
  };

  searchBonuses(filters) {
    const { dispatch } = this.props;
    dispatch(searchTeacherBonuses(filters)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        const bonusData = result.response.result;
        const teacherIds = _.chain(bonusData).map(item => item.teacherId).uniq().value();
        dispatch(getSimpleList(teacherIds)).then(() => {
          const { teacherBonusData, teachers } = this.props;
          const combinedResultData = _.map(teacherBonusData.result, (ele) => {
            const foundTeacher = _.find(teachers, teacher => teacher.id === ele.teacherId);
            const teacherInfo = {};
            if (foundTeacher) {
              teacherInfo.teacherName = foundTeacher.username;
              teacherInfo.teacherStatus = foundTeacher.status;
            }
            return _.assign({}, ele, teacherInfo);
          });

          const combinedBonusData = _.assign({},
            teacherBonusData, { result: combinedResultData });

          this.setState({ teacherBonusData: combinedBonusData });
        });
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { teacherBonusData } = this.state;
    const { total, pageSize, page, result: bonusList } = teacherBonusData;

    const columns = [
      {
        title: '老师',
        key: 'teacherName',
        dataIndex: 'teacherName',
      },
      {
        title: '老师状态',
        key: 'teacherStatus',
        dataIndex: 'teacherStatus',
        render: teacherStatus => (teacherStatus ? TEACHER_STATUS_MAP[teacherStatus].text : ''),
      },
      {
        title: '奖励类型',
        key: 'bonusType',
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
        key: 'bonusStatus',
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
        render: (text, record) => (
          <div>
            <Popconfirm
              title="该操作不可逆，确定执行？"
              onConfirm={() => this.recalcBonus(record)}
            >
              <Tooltip
                placement="top"
                title="重新计算"
              >
                <Button icon="calculator" style={{ marginRight: 8 }} />
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
        ),
      },
    ];

    const pagination = {
      total,
      pageSize,
      current: page,
      showSizeChanger: true,
      showTotal: all => `总共${all}条`,
    };

    return (
      <div>
        <SearchForm
          onCreate={() => this.setState({ dialogVisible: true })}
          onSearch={this.handleSearch}
        />
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={bonusList}
          pagination={pagination}
          style={{ marginTop: 16 }}
        />
        <Modal
          visible={this.state.dialogVisible}
          title="老师奖金"
          footer={null}
          onCancel={() => this.setState({ dialogVisible: false })}
        >
          <BonusForm onSubmit={this.createBonus} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loading, teacherBonus, teacher } = state;
  const { filters, result: teacherBonusData } = teacherBonus;
  const { simpleList: teachers } = teacher;
  return {
    loading,
    filters,
    teacherBonusData,
    teachers,
  };
}

export default connect(mapStateToProps)(Bonus);

