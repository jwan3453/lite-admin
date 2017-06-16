import React from 'react';
import {
  Tabs,
} from 'antd';

import BasicInfo from './BasicInfo';
import Steps from './Steps';

import * as CERT_TYPE from '../../../../common/certificationTypes';
import * as CERT_STATUS from '../../../../common/certificationStatus';

export default class Cert extends React.Component {
  static propTypes = {
    certification: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
    certification: {
      id: 0,
      title: '',
      required: false,
      reward: '',
      validDays: 90,
      status: CERT_STATUS.UNACTIVATED,
      type: CERT_TYPE.GENERAL,
      currency: 'USD',
      comment: '',
      steps: [],
    },
  };

  getCertification() {
    const basicInfo = this.basicInfoForm.getBasicInfo();
    const steps = this.stepsForm.getSteps();
    const cert = {
      steps,
      ...basicInfo,
    };
    return cert;
  }

  render() {
    const {
      steps,
      ...basicInfo
    } = this.props.certification;

    return (
      <Tabs defaultActiveKey="BasicInfo">
        <Tabs.TabPane
          tab="基础信息"
          key="BasicInfo"
        >
          <BasicInfo
            certification={basicInfo}
            ref={(node) => { this.basicInfoForm = node; }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="步骤"
          key="Steps"
        >
          <Steps
            steps={steps}
            ref={(node) => { this.stepsForm = node; }}
          />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

