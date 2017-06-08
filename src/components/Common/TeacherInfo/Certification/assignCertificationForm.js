import React from 'react';
import {
  Form,
} from 'antd';

class AssignCertificationForm extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        this is AssignCertificationForm
      </div>
    );
  }
}

export default Form.create()(AssignCertificationForm);

