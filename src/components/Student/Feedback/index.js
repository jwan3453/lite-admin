import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Modal,
} from 'antd';

import SearchForm from './SearchForm';
import ReplyForm from './ReplyForm';

class Feedback extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
    feedbacks: React.PropTypes.array,
  };

  static defaultProps = {
    loading: false,
    feedbacks: [],
  };

  render() {
    const {
      loading,
      feedbacks,
    } = this.props;

    const columns = [];

    return (
      <div>
        <SearchForm />
        <Table
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={feedbacks}
        />
        <Modal>
          <ReplyForm />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps() {
  return {
    loading: false,
    feedbacks: [],
  };
}

export default connect(mapStateToProps)(Feedback);

