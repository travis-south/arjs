import React, { Component } from 'react';

const styles = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold'
  },
  date: {
    fontSize: 'bold',
    color: '#888'
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    paddingLeft: 20
  }
};

export default class Article extends Component {
  render() {
    const {
      article, 
      store 
    } = this.props;
    const author = store.lookupAuthor(article.authorId);
    
    return (
      <div style={styles.article}>
        <div style={styles.title}>{article.title}</div>
        <div style={styles.date}>{article.date}</div>
        <div style={styles.author}>
          <a href={author.website}>
            {author.firstName} {author.lastName}
          </a>
        </div>
        <div style={styles.body}>{article.body}</div>
      </div>
    );
  }
}
