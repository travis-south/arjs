import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = (store) => {
  return {store};
}) => (Component) => {
  return class extends PureComponent {
    static contextTypes = {
      store: PropTypes.object,
    }
    static displayName = `${Component.name}Container`;
    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }
    componentWillUnmount() {
      if(this.context.store.unsubcribe){
        this.context.store.unsubcribe(this.subscriptionId);
        this.subscriptionId = null;
      }
    }
    onStoreChange = () => {
      if (this.subscriptionId){
        this.setState(this.usedState());
      }
    }
    usedState = () => {
      return extraProps(this.context.store, this.props);
    }
    state = this.usedState();
    render(){
      return (
        <Component 
          {...this.props}
          {...this.usedState()}
        />
      );
    }
  };
};

export default storeProvider;
