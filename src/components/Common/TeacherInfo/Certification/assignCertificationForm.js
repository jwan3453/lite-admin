import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Table,
} from 'antd';

class AssignCertificationForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool,
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    total: React.PropTypes.number,
    certifications: React.PropTypes.array,
  }

  static defaultProps = {
    loading: false,
    page: 1,
    pageSize: 10,
    total: 0,
    certifications: [],
  };

  state = {
    id: this.props.certifications[0].id,
    title: '',
  };

  search = (text) => {
    console.log('key word is ', text);
  }

  rowSelect = (selectedRowKeys, selectedRows) => {
    this.setState({
      id: selectedRowKeys[0],
      title: selectedRows[0].title,
    });
  };

  render() {
    const { id: selectedCertID } = this.state;

    const columns = [{
      title: '名称',
      key: 'title',
      dataIndex: 'title',
    }];

    const rowSelection = {
      type: 'radio',
      selectedRowKeys: [selectedCertID],
      onChange: this.rowSelect,
    };

    const {
      page,
      pageSize,
      total,
      loading,
      certifications,
    } = this.props;

    const pagination = {
      current: page,
      pageSize,
      total,
    };

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form>
          <Form.Item>
            {
              getFieldDecorator('keyWord', {
                rules: [
                  {
                    required: false,
                  },
                ],
              })(
                <Input.Search
                  placeholder="资质ID/名称"
                  onSearch={text => this.search(text)}
                />,
              )
            }
          </Form.Item>
          {
            getFieldDecorator('id', {
              initialValue: selectedCertID,
            })(
              <input type="hidden" />,
            )
          }
        </Form>
        <Table
          rowKey="id"
          size="small"
          showHeader={false}
          loading={loading}
          columns={columns}
          pagination={pagination}
          rowSelection={rowSelection}
          dataSource={certifications}
        />
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    certifications: [
      {
        id: 0,
        title: 'Milo Session',
      },
      {
        id: 1,
        title: '新建1-1',
      },
      {
        id: 2,
        title: '新建1-2',
      },
      {
        id: 3,
        title: '新建1-3',
      },
      {
        id: 4,
        title: '新建1-4',
      },
      {
        id: 5,
        title: '新建1-5',
      },
    ],
  };
}

export default Form.create()(connect(mapStateToProps)(AssignCertificationForm));

