import React from 'react';
import {
  Row,
  Col,
  Input,
  Icon,
} from 'antd';
import _ from 'lodash';

export default class ParameterInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
  };

  static defaultProps = {
    onChange: () => {},
  };

  constructor(props) {
    super(props);

    const { value } = props;
    const nameValuePairs = _.map(
      value,
      (pValue, pName) => ({
        name: pName,
        value: pValue,
      }),
    );

    this.state = {
      nameValuePairs,
    };
  }

  onBlur = () => {
    this.notifyChange();
  }

  getUniqKey(nameValuePairs) {
    const nonEmptyPair = _.filter(
      nameValuePairs,
      item => item.name.length > 0 && item.value.length > 0,
    );
    return _.map(nonEmptyPair, item => item.name).join('_');
  }

  notifyChange() {
    const { nameValuePairs } = this.state;
    const value = {};

    _.forEach(
      nameValuePairs,
      (pair) => {
        if (
          pair.name.length !== 0
        ) {
          value[pair.name] = pair.value || '';
        }
      },
    );

    this.props.onChange(value);
  }

  addParameter = () => {
    const { nameValuePairs } = this.state;
    nameValuePairs.push({
      name: '',
      value: '',
    });
    this.setState({
      nameValuePairs,
    });
  }

  removeParameter = (index) => {
    const { nameValuePairs } = this.state;
    const before = this.getUniqKey(nameValuePairs);

    nameValuePairs.splice(index, 1);

    const after = this.getUniqKey(nameValuePairs);

    this.setState({
      nameValuePairs,
    });

    if (before !== after) {
      this.notifyChange();
    }
  };

  handleParameterNameChange = (index, value) => {
    const { nameValuePairs } = this.state;
    nameValuePairs[index].name = value;
  };

  handleParameterValueChange = (index, value) => {
    const { nameValuePairs } = this.state;
    nameValuePairs[index].value = value;
  };

  render() {
    const {
      nameValuePairs,
    } = this.state;

    return (
      <div>
        {
          _.map(
            nameValuePairs,
            (pair, index, list) => (
              <Row
                gutter={16}
                key={`${pair.name}-${index}`}
              >
                <Col span={10}>
                  <Input
                    placeholder="请输入参数名"
                    defaultValue={`${pair.name}`}
                    onChange={
                      (eventArgs) => {
                        const value = eventArgs.target.value;
                        this.handleParameterNameChange(index, value);
                      }
                    }
                    onBlur={this.onBlur}
                  />
                </Col>
                <Col span={10}>
                  <Input
                    placeholder="请输入参数值"
                    defaultValue={`${pair.value}`}
                    onChange={
                      (eventArgs) => {
                        const value = eventArgs.target.value;
                        this.handleParameterValueChange(index, value);
                      }
                    }
                    onBlur={this.onBlur}
                  />
                </Col>
                <Col span={4}>
                  <Icon
                    type={
                      index !== list.length - 1
                      ? 'minus-circle'
                      : 'plus-circle'
                    }
                    onClick={
                      index !== list.length - 1
                      ? () => { this.removeParameter(index); }
                      : () => { this.addParameter(); }
                    }
                    style={{
                      cursor: 'pointer',
                      color: index !== list.length - 1 ? '' : '#108ee9',
                    }}
                  />
                </Col>
              </Row>
            ),
          )
        }
      </div>
    );
  }
}

