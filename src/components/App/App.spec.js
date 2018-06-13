import React from 'react';
import {mount, shallow} from 'enzyme';
import App from './App';
import Joke from '../Joke/Joke'

jest.mock('../../apiCalls/apiCalls');

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a Joke component', () => {
    expect(wrapper.containsMatchingElement(<Joke />)).toEqual(true);
  });

});
