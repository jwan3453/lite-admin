import React from 'react';
import {
  Form,
  Steps,
  Row,
  Col,
  Button,
  Icon,
  Tooltip,
} from 'antd';

import _ from 'lodash';

import StepForm from './StepForm';

class CertSteps extends React.Component {
  static propTypes = {
    form: React.PropTypes.object.isRequired,
  };

  state = {
    steps: [],
    currentStepIndex: 0,
  };

  forward = (index) => {
    const next = index + 1;
    const { steps } = this.state;
    const max = steps.length;

    if (next <= max - 1) {
      //  todo change position
      const target = steps[index];
      steps.splice(index, 1);
      steps.splice(next, 0, target);
    }

    this.setState({
      steps,
    });
  };

  backward = (index) => {
    const next = index - 1;
    const { steps } = this.state;

    if (next >= 0) {
      const target = steps[index];
      steps.splice(index, 1);
      steps.splice(next, 0, target);
    }

    this.setState({
      steps,
    });
  };

  goTo = (index) => {
    this.setState({
      currentStepIndex: index,
    });
  };

  addStep = () => {
    const { steps } = this.state;

    steps.push({
      title: `步骤 - ${steps.length + 1}`,
      type: '',
    });

    this.setState({
      steps,
    });
  };

  removeStep = (index) => {
    const { steps } = this.state;
    steps.splice(index, 1);
    const currentStepIndex = Math.min(index, steps.length - 1);
    this.setState({
      steps,
      currentStepIndex,
    });
  };

  render() {
    const {
      steps,
      currentStepIndex,
    } = this.state;

    const iconStyle = {
      marginLeft: '4px',
      cursor: 'pointer',
    };

    const currentStep = steps[currentStepIndex];

    return (
      <div>
        <Row style={{ marginBottom: 16 }}>
          <Col>
            <Button
              type="primary"
              onClick={this.addStep}
            >添加步骤</Button>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Steps
              direction="vertical"
              size="small"
              current={currentStepIndex}
            >
              {
                _.map(steps, (item, index) => (
                  <Steps.Step
                    status={index !== currentStepIndex ? 'wait' : 'process'}
                    title={
                      <div>
                        <a
                          role="button"
                          tabIndex="0"
                          style={{ cursor: 'pointer' }}
                          onClick={() => { this.goTo(index); }}
                        >{item.title}</a>
                        {
                          (index > 0)
                          ? (
                            <Tooltip title="上移">
                              <Icon
                                type="up"
                                style={iconStyle}
                                onClick={() => { this.backward(index); }}
                              />
                            </Tooltip>
                            )
                          : null
                        }
                        {
                          (index < steps.length - 1)
                          ? (
                            <Tooltip title="下移">
                              <Icon
                                type="down"
                                style={iconStyle}
                                onClick={() => { this.forward(index); }}
                              />
                            </Tooltip>
                            )
                          : null
                        }
                        <Tooltip title="删除">
                          <Icon
                            type="delete"
                            style={iconStyle}
                            onClick={() => { this.removeStep(index); }}
                          />
                        </Tooltip>
                      </div>
                    }
                  />
                ))
              }
            </Steps>
          </Col>
          {
            currentStep
            ? (
              <Col span={18}>
                <StepForm step={currentStep} />
              </Col>
              )
            : null
          }
        </Row>
      </div>
    );
  }
}

export default Form.create()(CertSteps);

