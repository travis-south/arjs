import React, {Component} from 'react';
import axios from 'axios';

import ArticleList from './ArticleList';

import StateApi from '../StateApi';

export default class App extends Component {
  state = this.props.store.getState();
  async componentDidMount() {
    const rawData = await axios.get('/api');
    const api = new StateApi(rawData.data);
  
    this.setState(() => {
      return {
        articles: api.getState().articles,
        authors: api.getState().authors,
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
