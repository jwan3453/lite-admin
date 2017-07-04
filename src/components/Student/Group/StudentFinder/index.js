import React from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Button,
  Table,
  Input,
  Icon,
} from 'antd';
import _ from 'lodash';
import { searchStudent } from '../../../../app/actions/student';

class StudentFinder extends React.PureComponent {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool.isRequired,
    filters: React.PropTypes.object.isRequired,
    students: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    filters: {},
    students: {},
    onSelect: () => {},
    onSelectAll: () => {},
  };

  state = {
    toBe: [],
    notToBe: [],
    selectedStudents: [],
    leftSelectedRowKeys: [],
    rightSelectedRowKeys: [],
    rightCurrentPage: 1,
  };

  onLeftSelectedRowsChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      toBe: selectedRows,
      leftSelectedRowKeys: selectedRowKeys,
    });
  };

  onRightSelectedRowsChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      notToBe: selectedRows,
      rightSelectedRowKeys: selectedRowKeys,
    });
  };

  onRightRowsChange = (selectedRowKeys, notToBe) => {
    this.setState({
      notToBe,
    });
  };

  handleLeftPageChanged = (pagination) => {
    const { dispatch, filters } = this.props;
    dispatch(
      searchStudent(
        Object.assign(filters, {
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ),
    );
  };

  handleRightPageChanged = (pagination) => {
    this.setState({
      rightCurrentPage: pagination.current,
    });
  };

  handleSearch = (value) => {
    const { dispatch } = this.props;
    dispatch(searchStudent({
      searchText: value,
    }));
  };

  select = () => {
    const {
      toBe,
    } = this.state;

    let { selectedStudents } = this.state;

    if (selectedStudents.length === 0) {
      selectedStudents = _.concat(toBe);
    } else {
      _.forEach(
        toBe,
        (item) => {
          const index = _.findIndex(selectedStudents, i => i.id === item.id);
          if (index === -1) {
            selectedStudents.push(item);
          }
        },
      );
    }

    this.setState({
      toBe: [],
      leftSelectedRowKeys: [],
      selectedStudents,
      rightCurrentPage: Math.ceil(selectedStudents.length / 10),
    });
  };

  cancel = () => {
    const {
      notToBe,
      selectedStudents,
    } = this.state;

    const students = _.xorBy(
      this.state.selectedStudents,
      notToBe,
      'id',
    );

    this.setState({
      notToBe: [],
      rightSelectedRowKeys: [],
      rightCurrentPage: Math.floor(selectedStudents.length / 10),
      selectedStudents: students,
    });
  };

  render() {
    const {
      loading,
      students,
    } = this.props;

    const {
      toBe,
      notToBe,
      leftSelectedRowKeys,
      rightSelectedRowKeys,
      selectedStudents,
      rightCurrentPage,
    } = this.state;

    const columns = [
      {
        title: '手机尾号',
        dataIndex: 'mobileSuffix',
        key: 'mobileSuffix',
        width: 100,
      },
      {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
      },
    ];

    const leftRowSelection = {
      type: 'checkbox',
      selectedRowKeys: leftSelectedRowKeys,
      onChange: this.onLeftSelectedRowsChange,
    };

    const leftDataSource = students.result || [];

    const leftPagination = {
      total: parseInt(students.total || 0, 10),
      pageSize: parseInt(students.pageSize || 10, 10),
      current: parseInt(students.page || 1, 10),
      simple: true,
    };

    const rightRowSelection = {
      type: 'checkbox',
      selectedRowKeys: rightSelectedRowKeys,
      onChange: this.onRightSelectedRowsChange,
    };

    const rightPagination = {
      total: selectedStudents.length,
      pageSize: 10,
      current: rightCurrentPage,
      simple: true,
    };

    return (
      <Row
        type="flex"
        justify="space-around"
        align="middle"
      >
        <Col span={10}>
          <Input.Search
            size="default"
            onSearch={this.handleSearch}
            prefix={<Icon type="mobile" style={{ fontSize: 13 }} />}
            placeholder="手机尾号 或 手机号"
          />
          <Table
            rowKey="id"
            size="small"
            loading={loading}
            style={{ marginTop: 16 }}
            columns={columns}
            dataSource={leftDataSource}
            pagination={leftPagination}
            onChange={this.handleLeftPageChanged}
            rowSelection={leftRowSelection}
          />
        </Col>
        <Col span={4} style={{ textAlign: 'center' }}>
          <div style={{ marginBottom: 16 }}>
            <Button
              icon="double-left"
              onClick={this.cancel}
              disabled={notToBe.length <= 0}
            />
          </div>
          <div>
            <Button
              icon="double-right"
              onClick={this.select}
              disabled={toBe.length <= 0}
            />
          </div>
        </Col>
        <Col span={10}>
          <Table
            rowKey="id"
            size="small"
            columns={columns}
            rowSelection={rightRowSelection}
            dataSource={selectedStudents}
            pagination={rightPagination}
            onChange={this.handleRightPageChanged}
            style={{ marginTop: 44 }}
          />
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  const { student } = state;
  const { loading, search } = student;
  const { filters, result } = search;

  return {
    loading,
    filters,
    students: result,
  };
}

export default connect(mapStateToProps)(StudentFinder);
