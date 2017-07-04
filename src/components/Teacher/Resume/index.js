import React, { Component } from 'react';
import { Table, Button, Modal, Tooltip, Tag, Message } from 'antd';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import Timetable from './timeTable';
import './index.less';
import * as RESUME_STATUS from '../../../common/teacherResumeStatus';
import { fetchResumes, changeStatus } from '../../../app/actions/teacher';

class Resume extends Component {

  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filter: React.PropTypes.object.isRequired,
    total: React.PropTypes.object.isRequired,
    page: React.PropTypes.object.isRequired,
    pageSize: React.PropTypes.object.isRequired,
  };

  static propTypes = {
    resumes: React.PropTypes.array.isRequired,
  };

  state = {
    timeSlotModalVisible: false,
    timeSlots: '',
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchResumes());
  }

  handletimeSlotClick = (timeSlots) => {
    this.setState({
      timeSlotModalVisible: true,
      timeSlots,
    });
  }

  handleSearch = (filter) => {
    const { dispatch } = this.props;
    dispatch(fetchResumes(filter));
  };

  handleChange = (pagination) => {
    const { dispatch } = this.props;
    dispatch(fetchResumes(pagination.filter, pagination.current, pagination.pageSize));
  }

  changeStatus = (recordId, status) => {
    const { dispatch, filter, page, pageSize } = this.props;
    dispatch(changeStatus(recordId, status)).then((result) => {
      if (!result.error) {
        Message.success('状态更改成功');
        dispatch(fetchResumes(filter, page, pageSize));
      } else {
        Message.success('状态更改失败');
      }
    });
  }


  render() {
    const { resumes, total, page, pageSize, filter } = this.props;
    const dataSource = [];
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        render: (text, record, index) => (
          <a role="button" tabIndex={index} onClick={() => this.handleGettingInfo(record.id)}>{text}</a>
        ),
      },

      {
        title: '姓',
        dataIndex: 'firstname',
        key: 'firstname',
      },
      {
        title: '名',
        dataIndex: 'lastname',
        key: 'lastname',
      },
      {
        title: '区域',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '备注',
        dataIndex: 'notes',
        key: 'notes',
      },
      {
        title: '是否有工作许可',
        dataIndex: 'workPermit',
        key: 'workPermit',
      },
      {
        title: '简历附件',
        dataIndex: 'attachedResume',
        key: 'attachedResume',
        render: (text, record, index) => {
          let linkUrl = '';
          if (text) {
            linkUrl = (<a href={text} role="button" tabIndex={index} >下载</a>);
          } else {
            linkUrl = (<span>无</span>);
          }
          return linkUrl;
        },
      },
      {
        title: '简历照片',
        dataIndex: 'attachedPhoto',
        key: 'attachedPhoto',
        render: (text, record, index) => {
          let linkUrl = '';
          if (text) {
            linkUrl = (<a href={text} role="button" tabIndex={index} >下载</a>);
          } else {
            linkUrl = (<span>无</span>);
          }
          return linkUrl;
        },
      },
      {
        title: '时间表',
        dataIndex: 'timeSlot',
        key: 'timeSlot',
        render: (text, record, index) => (
          <a role="button" tabIndex={index} onClick={() => this.handletimeSlotClick(text)}>查看</a>
        ),
      },
      {
        title: '申请时间',
        dataIndex: 'applyDate',
        key: 'applyDate',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record, index) => {
          const currentStatus = RESUME_STATUS.STATUS_MAP[text];

          const tag = (
            <Tag
              color={currentStatus.color}
              ref={(node) => { this[`status_${index}`] = node; }}
            >{currentStatus.text}</Tag>
          );
          return tag;
        },
      },
      {
        title: '操作',
        key: 'actions',
        className: 'actions',
        render: (text, record, index) => (
          <div className="resume-options">
            <Tooltip
              title="未查看"
              onClick={() => this.changeStatus(record.id, 0, index)}
            >
              <Button icon="eye" />
            </Tooltip >
            <Tooltip
              title="以查看"
              onClick={() => this.changeStatus(record.id, 1, index)}
            >
              <Button icon="eye-o" />
            </Tooltip>
            <Tooltip
              title="通过"
              onClick={() => this.changeStatus(record.id, 2, index)}
            >
              <Button icon="check-circle-o" />
            </Tooltip>
            <Tooltip
              title="未通过"
              onClick={() => this.changeStatus(record.id, 3, index)}
            >
              <Button icon="close-circle-o" />
            </Tooltip>
          </div>
        ),
      },
    ];
    if (resumes != null) {
      resumes.map((data) => {
        const tmpReusme = {
          id: data.id,
          firstname: data.firstName,
          lastname: data.lastName,
          location: data.location,
          email: data.email,
          notes: data.notes,
          workPermit: data.workPermit,
          attachedResume: data.fileUrl,
          attachedPhoto: data.imageUrl,
          timeSlot: data.timeSlots,
          applyDate: data.applyAt,
          status: data.status,
        };
        dataSource.push(tmpReusme);
        return tmpReusme;
      });
    }

    const pagniation = {
      current: page,
      pageSize,
      total,
      filter,
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '15', '20', '30'],
      showQuickJumper: true,
      showTotal: totalItem => `一共 ${totalItem} 条`,
    };

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          pageSize={10}
        />
        <Modal
          visible={this.state.timeSlotModalVisible}
          title="时间表"
          footer={null}
          onCancel={() => this.setState({ timeSlotModalVisible: false })}
          width={800}
        >
          <Timetable timeSlots={this.state.timeSlots} />
        </Modal>

        <Table
          style={{ marginTop: 16 }}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          pagination={pagniation}
          onChange={this.handleChange}
        /></div>);
  }
}

function mapStateToProps(state) {
  const { teacher } = state;
  const { loading, resumes, total, page, pageSize, filter } = teacher;
  return {
    loading,
    resumes,
    total,
    page,
    pageSize,
    filter,
  };
}


export default connect(mapStateToProps)(Resume);
