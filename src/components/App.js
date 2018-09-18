import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';

import StateApi from '../StateApi';

export default class App extends Component {
  state = this.props.store.getState();
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  async componentDidMount() {
    const rawData = await axios.get('/api');
    const store = new StateApi(rawData.data);
  
    this.setState(() => {
      return {
        articles: store.getState().articles,
        authors: store.getState().authors,
      };
    });
  }
  render() {
    return (
      <ArticleList 
        articles={this.state.articles}
        store={this.props.store}
      />
    );
  }
}
