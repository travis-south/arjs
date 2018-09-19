import React, { PureComponent } from 'react';

import ArticleContainer from './Article';

export default class ArticleList extends PureComponent {

  render() {
    return (
      <div>
        {Object.values(this.props.articles).map((article) => {
          return <ArticleContainer
            key={article.id}
            article={article}
          />;
        })}
      </div>
    );
  }
}
