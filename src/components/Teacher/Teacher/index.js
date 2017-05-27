import React, { Component } from 'react';

import SearchForm from './SearchForm';

export default class Room extends Component {
  static propTypes = {
    teachers: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    teachers: {},
  };

  handleSearch = (filters) => {
    console.log(filters);
  };

  render() {
    const { teachers } = this.props;
    const pageSize = teachers.pageSize || 10;

    return (
      <div>
        <SearchForm
          onSearch={this.handleSearch}
          pageSize={pageSize}
        />
      </div>
    );
  }
}
