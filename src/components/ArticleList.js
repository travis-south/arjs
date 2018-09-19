import React, { PureComponent } from 'react';

import Article from './Article';

export default class ArticleList extends PureComponent {
  
  render() {
    return (
      <div>
        {Object.values(this.props.articles).map((article) => {
          return <Article
            key={article.id}
            article={article}
          />;
        })}
      </div>
    );
  }
}
