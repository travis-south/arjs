import React from 'react';
import ArticleList from '../src/components/ArticleList';

import renderer from 'react-test-renderer';

const testProps = {
  articles: {
    a: { id: 'a'},
    b: { id: 'b'}
  },
  articleActions: {
    lookupAuthor: jest.fn(() => ({}))
  }
};

describe('ArticleList', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <ArticleList 
        {...testProps}
      />
    ).toJSON();

    expect(tree.children.length).toBe(2);
    expect(tree).toMatchSnapshot();
  });
});
