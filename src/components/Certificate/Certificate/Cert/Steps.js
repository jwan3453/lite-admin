import React from 'react';
import {
  Steps,
  Row,
  Col,
  Button,
  Icon,
  Tooltip,
} from 'antd';

import _ from 'lodash';

import StepForm from './StepForm';

export default class CertSteps extends React.Component {
  static propTypes = {
    steps: React.PropTypes.array.isRequired,
  };

  static defaultProps = {
    steps: [],
  };

  state = {
    steps: this.props.steps,
    currentStep: null,
    currentStepIndex: 0,
  };

  getSteps() {
    return this.state.steps;
  }

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
    const { steps } = this.state;
    console.log('goto', index, steps[index]);
    this.setState({
      currentStep: steps[index],
      currentStepIndex: index,
    });
  };

  addStep = () => {
    const { steps } = this.state;

    steps.push({
      id: Math.random(),
      title: `步骤 - ${steps.length + 1}`,
      type: '',
      comment: '',
      timeLimit: 0,
    });

    this.setState({
      steps,
    });
  };

  updateStep = (currentStep, values) => {
    if (currentStep) {
      const step = _.assign(currentStep, values);
      this.setState({
        currentStep: step,
      });
    }
  };

  removeStep = (index) => {
    const { steps } = this.state;
    steps.splice(index, 1);
    const currentStepIndex = Math.min(index, steps.length - 1);
    const currentStep = steps[currentStepIndex];
    this.setState({
      steps,
      currentStep,
      currentStepIndex,
    });
  };

  render() {
    const {
      steps,
      currentStep,
      currentStepIndex,
    } = this.state;

    const stepTitleStyle = {
      display: 'inline-block',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      verticalAlign: 'middle',
      maxWidth: 78,
      cursor: 'pointer',
    };

    const iconStyle = {
      marginLeft: '4px',
      cursor: 'pointer',
    };

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
                    key={item.title}
                    status={index !== currentStepIndex ? 'wait' : 'process'}
                    title={
                      <div>
                        <a
                          role="button"
                          tabIndex="0"
                          style={stepTitleStyle}
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
          <Col span={18}>
            {
              currentStep
              ? (
                <StepForm
                  step={currentStep}
                  onChange={(values) => {
                    this.updateStep(currentStep, values);
                  }}
                />
                )
              : null
            }
          </Col>
        </Row>
      </div>
    );
  }
}

