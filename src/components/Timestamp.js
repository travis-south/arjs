import React, { PureComponent } from 'react';
import storeProvider from './StoreProvider';

class Timestamp extends PureComponent {
  render() {
    return (
      <div>
        {this.props.timestamp.toUTCString()}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestamp: store.getState().timestamp,
  };
}

export default storeProvider(extraProps)(Timestamp);
