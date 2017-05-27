import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';

class RoomBasicInfo extends Component {
  static propTypes = {
    roomInfo: React.PropTypes.object.isRequired,
    lessonName: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    roomInfo: {},
    lessonName: '',
  };
  render() {
    const { roomInfo, lessonName } = this.props;
    const schedule = roomInfo.schedule || {};
    const labelSpan = 3;
    const itemSpan = 5;
    const rowProps = {
      type: 'flex',
      gutter: 16,
      style: {
        marginBottom: 10,
      },
    };
    return (
      <div>
        <Row {...rowProps}>
          <Col span={3}><div style={{ float: 'right' }}>房间操作</div></Col>
          <Col>
            <Button size="small" icon="file-add">增加房间</Button>
          </Col>
          <Col>
            <Button size="small" icon="delete">删除房间</Button>
          </Col>
          <Col>
            <Button size="small" icon="folder-add">复制排课</Button>
          </Col>
          <Col>
            <Button size="small" icon={schedule.isInternal ? 'unlock' : 'lock'}>
              {schedule.isInternal ? '设为公开课' : '设为内部课'}
            </Button>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col span={3}><div style={{ float: 'right' }}>老师操作</div></Col>
          <Col>
            <Button size="small" icon="check">标记完成</Button>
          </Col>
          <Col>
            <Button size="small" icon="exception">系统异常</Button>
          </Col>
          <Col>
            <Button size="small" icon="exception">老师异常</Button>
          </Col>
          <Col>
            <Button size="small" icon="cross">标记缺席</Button>
          </Col>
        </Row>
        <Row {...rowProps}>
          <Col span={labelSpan}>排课ID:</Col>
          <Col span={itemSpan}>{schedule.id}</Col>
          <Col span={labelSpan}>课程:</Col>
          <Col span={itemSpan}>{lessonName}</Col>
          <Col span={labelSpan}>老师:</Col>
          <Col span={itemSpan}>{roomInfo.teacherId}</Col>
          <Col span={labelSpan}>IP:</Col>
          <Col span={itemSpan}>{roomInfo.ip}</Col>
          <Col span={labelSpan}>turnIP:</Col>
          <Col span={itemSpan}>{roomInfo.turnIp}</Col>
          <Col span={labelSpan}>skynetIP:</Col>
          <Col span={itemSpan}>{roomInfo.skynetIp}</Col>
          <Col span={labelSpan}>房间学生:</Col>
          <Col span={itemSpan}>
            {roomInfo.studentCount} / {roomInfo.maxStudentCount}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect()(RoomBasicInfo);
