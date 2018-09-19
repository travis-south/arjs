import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import SearchBar from './Searchbar';
import Timestamp from './Timestamp';

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
  
}

export default class App extends PureComponent {
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext() {
    return {
      store: this.props.store,
    };
  }
  componentDidMount() {
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
