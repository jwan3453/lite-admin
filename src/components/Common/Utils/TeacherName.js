import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Queue from './Queue';
import { fetchTeachers } from '../../../app/actions/teacher';

class TeacherName extends PureComponent {
  static queue = null;
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    teacher: React.PropTypes.object,
    children: React.PropTypes.oneOf([
      React.PropTypes.node,
      React.PropTypes.func,
    ]),
    teacherId: React.PropTypes.oneOf([
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
  };
  static defaultProps = {
    teacher: null,
    children: null,
    teacherId: null,
  };

  componentDidMount() {
    const { dispatch, teacherId } = this.props;

    if (!TeacherName.queue) {
      TeacherName.queue = new Queue((teacherIds) => {
        // dispatch(stub(teacherIds));
        console.log(teacherIds);
      });
      dispatch(fetchTeachers());
    }

    if (teacherId) TeacherName.queue.push(teacherId);
  }

  render() {
    const { children } = this.props;
    const teacher = this.props.teacher || {};

    if (children instanceof Function) {
      return children(teacher.username, teacher);
    }

    return <span>{teacher.username}</span>;
  }
}

function mapStateToProps(state, ownProps) {
  const { teacherId } = ownProps;
  const { teacher: teacherState } = state;
  return {
    teacher: teacherState.teachers.find(
      teacher => String(teacher.id) === String(teacherId),
    ),
  };
}

export default connect(mapStateToProps)(TeacherName);
