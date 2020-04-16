import React from 'react';
import { shallow } from 'enzyme';
import Bookmarks from './Bookmarks';

describe('Bookmarks Component', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      Bookmarks: {
        book_info: {
          title: 'demian'
        },
        author: {
          name: 'hyojeong'
        },
        image_url: 'image/url'
      }
    };
  });

  xit('Should render book-report', () => {
    const wrapper = shallow(<Bookmarks />);
    expect(wrapper.props('bookmarks')).update(undefined);
    expect(wrapper.props()).toBe('');
  })
});