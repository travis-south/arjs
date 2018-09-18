import React, { Component } from 'react';

import Article from './Article';

export default class ArticleList extends Component {

  render() {
    return (
      <div>
        {Object.values(this.props.articles).map((article) => {
          return <Article
            key={article.id}
            article={article}
            store={this.props.store}
          />;
        })}
      </div>
    );
  }
}
