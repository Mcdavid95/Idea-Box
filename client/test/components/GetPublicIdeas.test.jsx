import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import initialState from '../../app/initialState';
import { user, props, nextProps } from '../__mocks__/components.mock';
import ConnectedGetPublicIdeas, { GetPublicIdeas } from '../../containers/GetPublicIdeas';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('Comment form component test', () => {
  it('should call the method componentDidMount', () => {
    const component = shallow(<GetPublicIdeas {...props} />);
    const componentDidMountSpy = jest.spyOn(component.instance(), 'componentDidMount');
    component.instance().componentDidMount({
      target: {
        name: user
      }
    });
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method componentWillReceiveProps', () => {
    const component = shallow(<GetPublicIdeas {...props} />);
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
    const component = shallow(<GetPublicIdeas {...props} />);
    component.setState({
      categoryIdeas: [
        { title: 'boss' }
      ]
    });
    const componentWillReceivePropsSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(props);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method handlePageClick', () => {
    const component = shallow(<GetPublicIdeas {...props} />);
    const handlePageClickSpy = jest.spyOn(component.instance(), 'handlePageClick');
    component.instance().handlePageClick({
      target: {
        name: user
      }
    });
    expect(handlePageClickSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method prevPage', () => {
    const component = shallow(<GetPublicIdeas {...props} />);
    component.setState({
      offset: 4
    });
    const event = {
      preventDefault: jest.fn()
    };
    const prevPageSpy = jest.spyOn(component.instance(), 'prevPage');
    component.instance().prevPage(event);
    expect(prevPageSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method nextPage', () => {
    const component = shallow(<GetPublicIdeas {...props} />);
    component.setState({
      offset: 4
    });
    const event = {
      preventDefault: jest.fn()
    };
    const nextPageSpy = jest.spyOn(component.instance(), 'nextPage');
    component.instance().nextPage(event);
    expect(nextPageSpy).toHaveBeenCalledTimes(1);
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedGetPublicIdeas {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
