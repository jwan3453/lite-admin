import React from 'react';
import { connect } from 'react-redux';
import { Table, Modal, Tag, message } from 'antd';

import moment from 'moment';

import SearchForm from './SearchForm';
import ActionBar from './ActionBar';
import StandbyRecordForm from './StandbyRecordForm';
import TeacherName from '../../Common/Utils/TeacherName';
import * as STANDBY_STATUS from './teacherStandbyStatus';
import {
  fetchTeacherStandby,
  updateTeacherStandby,
  createTeacherStandby,
} from '../../../app/actions/teacherStandby';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class StandbyTeachers extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    teachers: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    teachers: {},
  };
  state = {
    standbyDialogVisible: false,
    standby: {},
  };

  componentWillMount() {
    this.invalidate();
  }

  searchParams = {};

  invalidate(searchParams = {}) {
    const { dispatch } = this.props;

    this.searchParams = {
      ...this.searchParams,
      ...searchParams,
    };
    dispatch(fetchTeacherStandby(this.searchParams));
  }

  showTeacherInfo = () => {
    //  todo
  };

  createOrUpdateStandby = (newFields, standbyId) => {
    const { dispatch } = this.props;

    Promise.resolve()
      .then(
        () =>
          (standbyId
            ? dispatch(updateTeacherStandby(newFields, standbyId))
            : dispatch(createTeacherStandby(newFields))),
      )
      .then((action) => {
        if (action.code) {
          message.error(action.message);
          return;
        }
        message.success('操作成功');
        this.invalidate();
        this.hideStandbyDialog();
      });
  };

  createStandbyRecord = () => {
    const standbyId = this.state.standby.id;

    this.standbyForm.validateFields((errors, fields) => {
      if (errors) return;

      const fromTime = moment(
        `${fields.theDate.format('YYYY-MM-DD')} ${fields.time}`,
      );
      const toTime = fromTime.clone().add(30, 'minutes');
      const newFields = {
        fee: fields.fee,
        remark: fields.remark,
        teacherId: fields.teacher,
        status: fields.status,
        fromTime: fromTime.unix(),
        toTime: toTime.unix(),
      };

      this.createOrUpdateStandby(newFields, standbyId);
    });
  };

  updateStandbyStatus = (record, status) => {
    this.createOrUpdateStandby({ status }, record.id);
  };

  showStandbyDialog = (standby = {}) => {
    this.setState({
      standby,
      standbyDialogVisible: true,
    });
  };

  handlerTurnPage = (pagination) => {
    const { current, pageSize } = pagination;

    this.invalidate({ page: current, pageSize });
  };

  handleSearch = (filters) => {
    const searchParams = {};

    if (filters.teacher && filters.teacher !== '-1') {
      searchParams.teacherId = filters.teacher;
    }
    if (filters.status && filters.status !== '-1') {
      searchParams.status = filters.status;
    }
    if (filters.dateRange && filters.dateRange.length === 2) {
      let [fromMoment, toMoment] = filters.dateRange;

      if (fromMoment.isSame(toMoment) && filters.beginAt) {
        fromMoment = moment(
          `${fromMoment.format('YYYY-MM-DD')} ${filters.beginAt}`,
        );
        toMoment = fromMoment.clone().add(30, 'minutes');
      } else {
        fromMoment.startOf('day');
        toMoment.endOf('day');
      }

      searchParams.fromTime = fromMoment.unix();
      searchParams.toTime = toMoment.unix();
    }

    this.invalidate(searchParams);
  };

  hideStandbyDialog = () => {
    this.setState({
      standbyDialogVisible: false,
    });
  };

  render() {
    const { teachers } = this.props;
    const { standby } = this.state;
    const columns = [
      {
        title: '老师',
        key: 'teacher',
        render: (text, record) => (
          <a
            role="button"
            tabIndex="0"
            onClick={() => {
              this.showTeacherInfo(record);
            }}
          >
            {`[${record.teacherId}]`}
            <TeacherName teacherId={record.teacherId} />
          </a>
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'fromTime',
        render: beginAt => moment.unix(beginAt).format(DATE_FORMAT),
      },
      {
        title: '结束时间',
        dataIndex: 'toTime',
        render: endAt => moment.unix(endAt).format(DATE_FORMAT),
      },
      {
        title: '薪酬(美分)',
        dataIndex: 'fee',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          const standbyStatus = STANDBY_STATUS.STATUS_MAP[status];

          return <Tag color={standbyStatus.color}>{standbyStatus.text}</Tag>;
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, record) => (
          <ActionBar
            editEnable={Number(record.status) === STANDBY_STATUS.CREATED}
            onEdit={() => {
              this.showStandbyDialog(record);
            }}
            onConfirm={() => {
              this.updateStandbyStatus(record, STANDBY_STATUS.CONFIRMED);
            }}
          />
        ),
      },
    ];

    const pageSize = teachers.pageSize || 10;
    const pagination = {
      total: teachers.total || 0,
      pageSize,
      current: teachers.page || 1,
      showSizeChanger: true,
      showTotal: total => `总共${total}条`,
    };

    const dataSource = teachers.result || [];

    const { standbyDialogVisible } = this.state;

    return (
      <div>
        <SearchForm
          onCreate={() => this.showStandbyDialog()}
          onSearch={this.handleSearch}
        />
        <Table
          rowKey="id"
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          onChange={this.handlerTurnPage}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="老师待命记录"
          visible={standbyDialogVisible}
          onOk={this.createStandbyRecord}
          onCancel={this.hideStandbyDialog}
        >
          <StandbyRecordForm
            standby={standby}
            ref={(standbyForm) => {
              this.standbyForm = standbyForm;
            }}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    teachers: state.teacherStandby.result,
  };
}

export default connect(mapStateToProps)(StandbyTeachers);
