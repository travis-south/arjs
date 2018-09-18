import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArticleList from '../src/components/ArticleList';
import Article from '../src/components/Article';

configure({ adapter: new Adapter() });

describe('ArticleList', () => {
  const testProps = {
    articles: {
      a: { id: 'a'},
      b: { id: 'b'}
    },
    store: {
      lookupAuthor: jest.fn(() => ({}))
    }
  };

  Article.propTypes = {};

  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList 
        {...testProps}
      />
    );

    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
