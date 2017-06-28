import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Modal,
  Tag,
} from 'antd';

import moment from 'moment';

import SearchForm from './SearchForm';
import ActionBar from './ActionBar';
import StandbyRecordForm from './StandbyRecordForm';
import * as STANDBY_STATUS from './teacherStandbyStatus';

const DATE_FORMAT = 'YYYY-MM-DD hh:mm:ss';

class StandbyTeachers extends React.Component {
  static propTypes = {
    teachers: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    teachers: {},
  };

  state = {
    standbyDialogVisible: false,
  };

  showTeacherInfo = () => {
    //  todo
  };

  createStandbyRecord = () => {
    //  todo
  };

  showStandbyDialog = () => {
    this.setState({
      standbyDialogVisible: true,
    });
  };

  hideStandbyDialog = () => {
    this.setState({
      standbyDialogVisible: false,
    });
  };

  render() {
    const { teachers } = this.props;

    const columns = [
      {
        title: '老师',
        key: 'teacher',
        render: (text, record) => (
          <a
            role="button"
            tabIndex="0"
            onClick={() => { this.showTeacherInfo(record); }}
          >{`[${record.teacherId}] ${record.teacherName}`}</a>
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'beginAt',
        render: beginAt => moment(beginAt).format(DATE_FORMAT),
      },
      {
        title: '结束时间',
        dataIndex: 'endAt',
        render: endAt => moment(endAt).format(DATE_FORMAT),
      },
      {
        title: '薪酬',
        dataIndex: 'fee',
      },
      {
        title: '状态',
        dataIndex: 'status',
        render: (status) => {
          const standbyStatus = STANDBY_STATUS.STATUS_MAP[status];

          return (
            <Tag
              color={standbyStatus.color}
            >{standbyStatus.text}</Tag>
          );
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
            onEdit={() => { this.showStandbyDialog(record); }}
            onRemove={() => { this.removeStandbyRecord(record); }}
            onConfirm={
              () => {
                this.updateStandbyStatus(record, STANDBY_STATUS.CONFIRMED);
              }
            }
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
          onCreate={this.showStandbyDialog}
        />
        <Table
          rowKey="id"
          pagination={pagination}
          columns={columns}
          dataSource={dataSource}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="老师待命记录"
          visible={standbyDialogVisible}
          onOk={this.createStandbyRecord}
          onCancel={this.hideStandbyDialog}
        >
          <StandbyRecordForm />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    teachers: {
      page: 1,
      pageSize: 10,
      total: 100,
      result: [
        {
          id: 1,
          teacherId: 1,
          teacherName: '',
          beginAt: '2017-06-15 18:40:00',
          endAt: '2017-06-15 19:10:00',
          fee: 0,
          status: 0,
          remark: '',
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(StandbyTeachers);

