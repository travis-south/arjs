import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (Component) => {
  return class extends React.Component {
    static contextTypes = {
      store: PropTypes.object,
    }
    static displayName = `${Component.name}Container`;
    render(){
      return (
        <Component {...this.props} store={this.context.store} />
      );
    }
  };
};

export default storeProvider;
