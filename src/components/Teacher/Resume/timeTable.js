import React, { Component } from 'react';

export default class timeTable extends Component {

  static propTypes = {
    timeSlots: React.PropTypes.string.isRequired,
  };

  render() {
    const tableContentArray = [];
    const timeSlots = this.props.timeSlots;
    const timeSlotsArray = timeSlots.split(',');
    let rowContent = '';

    for (let i = 0; i < 7; i += 1) {
      let tmpRowContent =
        `<div class="row">
          <div class="column">
            <div class="slot" data-field="06:40" /></div>
          </div>
          <div class="column">
            <div class="slot" data-field="07:20" /></div>
          </div>
          <div class="column">
            <div class="slot" data-field="08:00" /></div>
          </div>
          <div class="column">
            <div class="slot" data-field="08:40" /></div>
          </div>
          <div class="column">
            ${(i !== 4 && i !== 5) ? '<div class="dis-slot" data-field="21:20" /></div>' : '<div class="slot" data-field="21:20" /></div>'}
          </div>
          <div class="column">
            ${(i !== 4 && i !== 5) ? '<div class="dis-slot" data-field="22:00" /></div>' : '<div class="slot" data-field="22:00" /></div>'}
          </div>
          <div class="column">
            ${(i !== 4 && i !== 5) ? '<div class="dis-slot" data-field="22:40" /></div>' : '<div class="slot" data-field="22:40" /></div>'}
          </div>
          <div class="column">
            ${(i !== 4 && i !== 5) ? '<div class="dis-slot" data-field="23:20" /></div>' : '<div class="slot" data-field="23:20" /></div>'}
          </div>
        </div>`;

      for (let j = 0; j < timeSlotsArray.length; j += 1) {
        if (parseInt(timeSlotsArray[j].split('-')[0], 10) === (i + 1)) {
          const needReplace = `<div class="slot" data-field="${timeSlotsArray[j].split('-')[1]}" />`;
          const newContent = `<div class="selected-slot" data-field="${timeSlotsArray[j].split('-')[1]}" />`;
          tmpRowContent = tmpRowContent.replace(needReplace, newContent);
        }
      }

      tableContentArray.push(tmpRowContent);
    }
    console.log(tableContentArray);

    return (
      <div>
        <div className="time-span" id="timespans">
          <span>06:40</span>
          <span>07:20</span>
          <span>08:00</span>
          <span>08:40</span>
          <span>21:20</span>
          <span>22:20</span>
          <span>22:40</span>
          <span>23:20</span>
        </div>
        <div className="week-days">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        <div
          className="time-slot"
          dangerouslySetInnerHTML={{
            __html: tableContentArray.map((data) => {
              rowContent = data;
              return (rowContent);
            }).join('') }}
        />
        <div className="t-footer">
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

