import React from 'react';
import { connect } from 'react-redux';
import {
  Table,
} from 'antd';

import SearchForm from './SearchForm';

class TeacherSchedules extends React.Component {
  render() {
    return (
      <div>
        <SearchForm />
        <Table />
      </div>
    );
  }
}

function mapStateToProps() {}

export default connect(mapStateToProps)(TeacherSchedules);

