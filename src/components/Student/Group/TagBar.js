import React from 'react';
import {
  Icon,
  Tag,
} from 'antd';
import _ from 'lodash';

export default class TagBar extends React.Component {
  static propTypes = {
    tags: React.PropTypes.array,
    onRemoveTag: React.PropTypes.func,
  };

  static defaultProps = {
    tags: [],
    onRemoveTag: () => {},
  };

  render() {
    const { tags, onRemoveTag } = this.props;

    const labelStyle = {
      display: 'inline-block',
      maxWidth: '60px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      verticalAlign: 'middle',
    };

    const iconStyle = {
      marginLeft: 8,
      verticalAlign: 'middle',
    };

    return (
      <div
        style={{
          marginBottom: tags.length !== 0 ? 8 : 0,
        }}
      >
        {
          _.map(
            tags,
            (item, index) => (
              <Tag key={item.id} style={{ marginBottom: 8 }}>
                <span style={labelStyle}>{item.name}</span>
                <Icon
                  type="delete"
                  onClick={
                    () => { onRemoveTag(index); }
                  }
                  style={iconStyle}
                />
              </Tag>
            ),
          )
        }
      </div>
    );
  }
}

