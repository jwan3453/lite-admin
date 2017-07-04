import React, { Component } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import 'moment-timezone';

export default class timeTable extends Component {

  static propTypes = {
    timeSlots: React.PropTypes.string.isRequired,
  };

  state = {
    pageSize: 10,
    estOptionClass: 'option',
    utcOptionClass: 'option option-selected',
    dataColumn: null,
    dataSource: null,
  };

  handleTimeZoneOptionCick = (timezone, dataColumn, dataSource) => {
    if (timezone === 'EST') {
      this.setState({
        estOptionClass: 'option option-selected ',
        utcOptionClass: 'option',
        dataColumn,
        dataSource,
      });
    } else if (timezone === 'UTC') {
      this.setState({
        estOptionClass: 'option',
        utcOptionClass: 'option option-selected ',
        dataColumn,
        dataSource,
      });
    }
  };

  render() {
    const StandardDate = '1970-01-01';
    const weekdayColumnHeader = 'day';
    const timeSlots = JSON.parse(this.props.timeSlots);
    const timespansInEt = Object.keys(timeSlots[0]);
    const timespansInUtc = [];
    const columnsInEt = [];
    const columnsInUtc = [];
    const dataSource = timeSlots;
    const dataSouceInUst = [];
    for (let i = 0; i < timespansInEt.length; i += 1) {
      const columnInEt = {
        title: timespansInEt[i],
        dataIndex: timespansInEt[i],
        key: timespansInEt[i],
        render: (text) => {
          let columnHtml = '';
          if (text === 'selected') {
            columnHtml = (<div className="selected-slot" />);
          } else if (text === 'unselected') {
            columnHtml = (<div className="slot" />);
          } else if (text === 'disable') {
            columnHtml = (<div className="dis-slot" />);
          } else {
            columnHtml = (<div className="weekday">{text}</div>);
          }
          return columnHtml;
        },
      };
      columnsInEt.push(columnInEt);

      if (timespansInEt[i] !== weekdayColumnHeader) {
        const localTime = moment.tz(`${StandardDate} ${timespansInEt[i]}`, 'America/New_York');
        const AisaTime = localTime.clone().tz('Asia/Shanghai');
        const newTime = moment(AisaTime).format('HH:mm');
        timespansInUtc.push(newTime);
      } else {
        timespansInUtc.push(timespansInEt[i]);
      }
    }

    for (let tsa = 0; tsa < timespansInUtc.length; tsa += 1) {
      for (let tsb = 0; tsb < timespansInUtc.length; tsb += 1) {
        if (parseInt(timespansInUtc[tsb].replace(':', '').substring(0, 4), 10) > parseInt(timespansInUtc[tsa].replace(':', '').substring(0, 4), 10)) {
          const tmp = timespansInUtc[tsa];
          timespansInUtc[tsa] = timespansInUtc[tsb];
          timespansInUtc[tsb] = tmp;
        }
      }
    }

    for (let i = 0; i < timespansInUtc.length; i += 1) {
      const columnInUTC = {
        title: timespansInUtc[i],
        dataIndex: timespansInUtc[i],
        key: timespansInUtc[i],
        render: (text) => {
          let columnHtml = '';
          if (text === 'selected') {
            columnHtml = (<div className="selected-slot" />);
          } else if (text === 'unselected') {
            columnHtml = (<div className="slot" />);
          } else if (text === 'disable') {
            columnHtml = (<div className="dis-slot" />);
          } else {
            columnHtml = (<div className="weekday">{text}</div>);
          }
          return columnHtml;
        },
      };
      columnsInUtc.push(columnInUTC);
    }

    for (let i = 0; i < timeSlots.length; i += 1) {
      const tmpSourceData = {};
      for (let j = 0; j < timespansInUtc.length; j += 1) {
        tmpSourceData[timespansInUtc[j]] = '';
      }
      dataSouceInUst.push(Object(tmpSourceData));
    }

    for (let i = 0; i < dataSource.length; i += 1) {
      for (let j = 0; j < timespansInEt.length; j += 1) {
        if (timespansInEt[j] !== weekdayColumnHeader) {
          const localTime = moment.tz(`${StandardDate} ${timespansInEt[j]}`, 'America/New_York');
          const AisaTime = localTime.clone().tz('Asia/Shanghai');
          const newTime = moment(AisaTime).format('HH:mm');
          if (moment(AisaTime).diff(moment(StandardDate), 'days') > 0) {
            if (i === (dataSource.length - 1)) {
              dataSouceInUst[0][newTime] = dataSource[i][timespansInEt[j]];
            } else {
              dataSouceInUst[i + 1][newTime] = dataSource[i][timespansInEt[j]];
            }
          } else {
            dataSouceInUst[i][newTime] = dataSource[i][timespansInEt[j]];
          }
        } else {
          dataSouceInUst[i][weekdayColumnHeader] = dataSource[i][timespansInEt[j]];
        }
      }
    }
    return (
      <div>
        <Table
          className="time-table"
          columns={
            this.state.dataColumn == null ? columnsInUtc : this.state.dataColumn}
          rowKey="id"
          pagination={false}
          dataSource={
            this.state.dataSource == null ? dataSouceInUst : this.state.dataSource
          }
        />
        <div className="t-footer">
          <div className="tz-option">
            <option
              className={this.state.estOptionClass}
              onClick={() => this.handleTimeZoneOptionCick('EST', columnsInEt, dataSource)}
            />
            <span>EST</span>
            <option
              className={this.state.utcOptionClass}
              onClick={() => this.handleTimeZoneOptionCick('UTC', columnsInUtc, dataSouceInUst)}
            />
            <span>UTC + 8</span>
          </div>
          <div className="notation">
            <div className="color-mark">
              <div className="dis" />
              <span>DISABLE</span>
            </div>


            <div className="color-mark">
              <div className="sed" />
              <span>SELECTED</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
