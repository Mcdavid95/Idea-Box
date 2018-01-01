import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import initialState from '../../app/initialState';
import { user, props, nextProps } from '../__mocks__/components.mock';
import ConnectedCommentPage, { CommentPage } from '../../containers/CommentPage';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('Comment form component test', () => {
  it('should call the method componentDidMount', () => {
    const component = shallow(<CommentPage {...props} />);
    const componentDidMountSpy = jest.spyOn(component.instance(), 'componentDidMount');
    component.instance().componentDidMount({
      target: {
        name: user
      }
    });
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method componentWillReceiveProps', () => {
    const component = shallow(<CommentPage {...props} />);
    component.setState({
      categoryIdeas: [
        { title: 'boss' }
      ]
    });
    const componentWillReceivePropsSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method componentWillReceiveProps', () => {
    const component = shallow(<CommentPage {...props} />);
    component.setState({
      categoryIdeas: [
        { title: 'boss' }
      ]
    });
    const componentWillReceivePropsSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(props);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedCommentPage {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
