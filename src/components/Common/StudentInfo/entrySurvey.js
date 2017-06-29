import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import {
  Spin,
  Select,
  Card,
  Message,
  Button,
} from 'antd';
import { updateLevel, fetchStudent, fetchEntrySurveyQuestion } from '../../../app/actions/student';
import { fetchUserCourseActive } from '../../../app/actions/course';
import levels from '../../../common/levels';
import questions from '../../../common/entrySurveyQuestion';

class EntrySurvey extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    studentLoaded: React.PropTypes.bool.isRequired,
    studentId: React.PropTypes.number.isRequired,
    studentLevel: React.PropTypes.number,
    answers: React.PropTypes.object,
  };

  static defaultProps = {
    loading: false,
    studentLevel: 0,
    answers: {},
  };

  state = {
    modifyLevelLock: true,
  }

  componentWillMount() {
    const { dispatch, studentLoaded, studentId } = this.props;
    if (!studentLoaded) {
      dispatch(fetchStudent(studentId));
      dispatch(fetchEntrySurveyQuestion(studentId));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, studentId } = this.props;
    if (nextProps.studentId > 0 && nextProps.studentId !== studentId) {
      this.setState({ modifyLevelLock: true });
      dispatch(fetchStudent(nextProps.studentId));
      dispatch(fetchEntrySurveyQuestion(nextProps.studentId));
    }
  }

  handleLevelChange = (value) => {
    const { dispatch, studentId } = this.props;
    dispatch(updateLevel(studentId, { level: value })).then((result) => {
      if (result.code) {
        Message.error(result.message);
      } else {
        Message.success('更改级别成功');
        dispatch(fetchStudent(studentId));
        dispatch(fetchUserCourseActive(studentId));
      }
    });
    this.setState({ modifyLevelLock: true });
  };

  handleModifyLockClick = () => {
    this.setState({ modifyLevelLock: false });
  }

  render() {
    const { loading, answers } = this.props;
    return (
      <Spin spinning={loading}>
        <div>
          课程级别:
          <Select
            size="small"
            onChange={this.handleLevelChange}
            style={{ marginLeft: 10, marginRight: 10, marginBottom: 16, width: 200 }}
            value={`${this.props.studentLevel}`}
            disabled={this.state.modifyLevelLock}
          >
            {
              levels.map(item => (
                <Select.Option key={item.value} value={String(item.value)}>
                  {item.name}
                </Select.Option>
            ))
            }
          </Select>
          修改
            <Button
              icon="lock"
              style={{ marginLeft: 10 }}
              onClick={this.handleModifyLockClick}
            />
        </div>
        <div>
          {
              _.isEmpty(answers) ?
                <Card style={{ width: 350 }}>
                  <p>暂时没有问卷数据</p>
                </Card>
                :
                <Card style={{ width: 350 }}>
                  <p>问题1： {questions.questions1}？</p>
                  <p>答案1： {answers.answer1} </p>
                  <p>问题2： {questions.questions2}？</p>
                  <p>答案2： {answers.answer2} </p>
                  <p>问题3： {questions.questions3}？</p>
                  <p>答案3： {answers.answer3} </p>
                </Card>
            }
        </div>
      </Spin>
    );
  }
}

function mapStateToProps(state) {
  const { student } = state;
  return {
    studentLevel: student.studentInfo.result.level,
    studentLoaded: student.loading,
    answers: student.surveyAnswers,
  };
}
export default connect(mapStateToProps)(EntrySurvey);
