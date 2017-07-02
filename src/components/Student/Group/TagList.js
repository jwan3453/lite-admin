import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Input,
} from 'antd';

class TagList extends React.Component {
  static propTypes = {
    tags: PropTypes.shape({
      loading: PropTypes.bool,
      page: PropTypes.number,
      pageSize: PropTypes.number,
      total: PropTypes.number,
      result: PropTypes.array,
    }).isRequired,

    selectedRowKeys: PropTypes.array,
    onSelectedRowsChange: PropTypes.func,
  };

  static defaultProps = {
    selectedRowKeys: [],
    onSelectedRowsChange: () => {},
  };

  searchTags = (e) => {
    console.log('searchTags', e);
  };

  render() {
    const {
      tags,
      selectedRowKeys,
      onSelectedRowsChange,
    } = this.props;

    const tagColumns = [
      {
        title: '标签',
        dataIndex: 'name',
      },
      {
        title: '人数',
        dataIndex: 'studentCount',
      },
    ];

    const tagPagination = {
      total: tags.total || 0,
      pageSize: tags.pageSize,
      current: tags.page || 1,
      showSizeChanger: true,
      size: 'small',
      simple: true,
      showTotal: all => `总共${all}条`,
    };

    const tagSelection = {
      selectedRowKeys,
      onChange: onSelectedRowsChange,
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    };

    return (
      <div>
        <Input.Search
          placeholder="Tag 关键字"
          style={{ marginBottom: 16 }}
          onPressEnter={
            (eventArgs) => { this.searchTags(eventArgs); }
          }
        />
        <Table
          size="small"
          rowKey="id"
          rowSelection={tagSelection}
          loading={tags.loading}
          columns={tagColumns}
          dataSource={tags.result}
          pagination={tagPagination}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    tags: {
      loading: false,
      total: 200,
      page: 1,
      pageSize: 10,
      result: [
        {
          id: 1,
          name: 'tag1',
          studentCount: 10,
        },
        {
          id: 2,
          name: 'tag2',
          studentCount: 100,
        },
        {
          id: 3,
          name: 'tag3',
          studentCount: 1000,
        },
      ],
    },
  };
}

export default connect(mapStateToProps)(TagList);
