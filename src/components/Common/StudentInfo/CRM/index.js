import React from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Popconfirm,
  Modal,
  Select,
  Table,
  Message,
} from 'antd';

import CreateCommentForm from './crmCommentForm';
import crmStatus from '../../../../common/crmStatus';
import { fetchStudent } from '../../../../app/actions/student';
import { updateCrmStatus, createCrmStatus, fetchCrmList, deleteCrm } from '../../../../app/actions/crm';

class Crm extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    studentId: React.PropTypes.number.isRequired,
    studentInfo: React.PropTypes.object.isRequired,
    crmData: React.PropTypes.object,
    loading: React.PropTypes.bool,
    filters: React.PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    crmData: {},
    filters: {},
  };

  state = {
    dialogVisible: false,
  };

  componentWillMount() {
    const { dispatch, studentId, loading } = this.props;
    if (studentId > 0 && !loading) {
      dispatch(fetchStudent(studentId));
      dispatch(fetchCrmList(studentId));
    }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      dispatch(fetchStudent(nextProps.studentId));
      dispatch(fetchCrmList(nextProps.studentId));
    }
  }

  removeComment = (crm) => {
    const { dispatch, studentId } = this.props;
    dispatch(deleteCrm(crm.id)).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('删除crm备注成功');
        this.setState({
          dialogVisible: false,
        });
        dispatch(fetchCrmList(studentId));
      }
    });
  };

  showAddCommentsDialog = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  handleCreateCrm = (data) => {
    const { dispatch, studentId } = this.props;
    dispatch(createCrmStatus({ ...data, studentId })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('新建备注成功');
        this.setState({
          dialogVisible: false,
        });
        dispatch(fetchCrmList(studentId));
      }
    });
  };

  handleUpdateCrmStatus = (value) => {
    const { dispatch, studentId } = this.props;
    dispatch(updateCrmStatus(studentId,
      { status: value })).then((result) => {
        if (result.code) {
          Message.error(result.message);
        } else {
          Message.success('更改用户crm状态成功');
          dispatch(fetchStudent(studentId));
        }
      });
  };

  handlePaginationChange = (pagination) => {
    const { dispatch, filters, studentId } = this.props;
    dispatch(
      fetchCrmList(studentId,
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  render() {
    const {
      crmData,
      loading,
      studentInfo,
    } = this.props;

    const pageSize = crmData.pageSize || 10;
    const dataSource = crmData.result || [];
    const pagination = {
      total: crmData.total || 0,
      pageSize,
      current: crmData.page || 1,
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
        title: '用户',
        key: 'studentId',
        dataIndex: 'studentId',
      },
      {
        title: '创建人',
        key: 'createdByUsername',
        dataIndex: 'createdByUsername',
      },
      {
        title: '备注',
        key: 'comments',
        dataIndex: 'comments',
      },
      {
        title: '操作',
        key: 'actions',
        render: (text, crm) => (
          <div>
            <Popconfirm
              title="确认删除？"
              placement="top"
              okText="确定"
              cancelText="取消"
              onConfirm={() => this.removeComment(crm)}
            >
              <Button icon="delete" />
            </Popconfirm>
          </div>
        ),
      },
    ];

    return (
      <div>
        <div>
          <Button
            onClick={this.showAddCommentsDialog}
            type="primary"
            style={{ marginRight: 8 }}
          >新增备注</Button>
          <Select
            style={{ width: '50%', marginBottom: 10, marginLeft: 10 }}
            defaultValue={`${studentInfo.crmStatus}`}
            value={`${studentInfo.crmStatus}`}
            onChange={this.handleUpdateCrmStatus}
          >
            {
              crmStatus.map(item => (
                <Select.Option
                  key={`${item.value}`}
                  value={`${item.value}`}
                >{item.name}</Select.Option>
              ))
            }
          </Select>
        </div>
        <Table
          rowKey="id"
          size="small"
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={this.handlePaginationChange}
          style={{ marginTop: 16 }}
        />
        <Modal
          title="添加备注"
          okText="添加"
          cancelText="取消"
          visible={this.state.dialogVisible}
          footer={null}
          onCancel={() => { this.setState({ dialogVisible: false }); }}
        >
          <CreateCommentForm
            onSubmit={this.handleCreateCrm}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { student, crm } = state;
  const { studentInfo } = student;
  const { loading, crmData } = crm;
  const { result } = studentInfo;
  return {
    loading,
    crmData: crmData.result,
    studentInfo: result,

  };
}

export default connect(mapStateToProps)(Crm);

