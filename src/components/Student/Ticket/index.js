import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Modal,
} from 'antd';

import SearchForm from './SearchForm';

class Tickets extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired,
  };

  state = {
    dialogVisible: false,
  };

  render() {
    const {
      loading,
    } = this.props;

    return (
      <div>
        <SearchForm />
        <Table
          loading={loading}
        />
        <Modal
          title="工单"
          visible={this.state.dialogVisible}
        >this is ticket dialog</Modal>
      </div>
    );
  }
}

function mapStateToProps() {}

export default connect(mapStateToProps)(Tickets);

