import _ from 'lodash';

import React, { Component } from 'react';
import { Cascader } from 'antd';

export default class CourseCascader extends Component {
  static propTypes = {
    courses: React.PropTypes.array,
  };
  static defaultProps = {
    courses: [],
  }
  state = {
    courseCascader: [],
  };

  componentDidMount() {
    const { courses } = this.props;
    this.updateCascader(courses);
  }

  componentWillReceiveProps(nextProps) {
    const { courses } = nextProps;
    this.updateCascader(courses);
  }

  updateCascader(courses) {
    const courseCascader = courses.map((course) => {
      let chapters = [];
      if (course.chapters) {
        chapters = course.chapters.map((chapter) => {
          let lessons = [];
          if (chapter.lessons) {
            lessons = chapter.lessons.map(lesson => ({
              value: lesson.id,
              label: `Lesson ${lesson.name}`,
            }));
          }

          return {
            value: chapter.id,
            label: chapter.name,
            children: lessons,
          };
        });
      }

      return {
        value: course.id,
        label: course.name,
        children: chapters,
      };
    });
    this.setState({ courseCascader });
  }

  render() {
    return (
      <Cascader
        options={this.state.courseCascader}
        {..._.omit(this.props, 'courses', 'options')}
      />
    );
  }
}
