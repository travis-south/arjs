import React, {PureComponent} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import StateApi from '../StateApi';
import SearchBar from './Searchbar';
import Timestamp from './Timestamp';

export default class App extends PureComponent {
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

    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  appState = () => {
    const {articles, searchTerm} = this.props.store.getState();
    return {articles, searchTerm};
  }
  state = this.appState();
  componentWillUnmount() {
    this.props.store.unsubcribe(this.subscriptionId);
  }
  onStoreChange = () => {
    this.setState(this.appState());
  }
  filterArticles = () => {
    let {articles, searchTerm} = this.state;
    if (searchTerm) {
      const searchRE = new RegExp(searchTerm, 'i');
      let authorId = this.props.store.getAuthorIdByName(searchTerm);
      return pickBy(articles, (value) => {
        return value.title.match(searchRE)
          || value.body.match(searchRE)
          || value.authorId.match(authorId);
      });
    }
    return articles;
  }
  render() {
    let articles = this.filterArticles();
    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList 
          articles={articles}
        />
      </div>
    );
  }
}
