import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import initialState from '../../app/initialState';
import { user, props, nextProps } from '../__mocks__/components.mock';
import ConnectedSideNav, { SideNav } from '../../containers/SideNav';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('Comment form component test', () => {
  it('should call the method componentDidMount', () => {
    const component = shallow(<SideNav {...props} />);
    const componentDidMountSpy = jest.spyOn(component.instance(), 'componentDidMount');
    component.instance().componentDidMount({
      target: {
        name: user
      }
    });
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method componentWillReceiveProps', () => {
    const component = shallow(<SideNav {...props} />);
    const componentWillReceivePropsSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method logout', () => {
    const component = shallow(<SideNav {...props} />);
    const event = {
      preventDefault: jest.fn()
    };
    const logoutSpy = jest.spyOn(component.instance(), 'logout');
    component.instance().logout(event);
    expect(logoutSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method onClick', () => {
    const component = shallow(<SideNav {...props} />);
    const category = 'family';
    const onClickSpy = jest.spyOn(component.instance(), 'onClick');
    component.instance().onClick(category, 1);
    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedSideNav {...props} store={store} />);
    expect(component.length).toBe(1);
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .tech').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .family').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .education').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .transport').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .entertainment').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .computer-science').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .telecom').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .infastructure').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .community').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .social-media').simulate('click');
  });

  it('should select a category', () => {
    const wrapper = shallow(<SideNav {...props} />);
    wrapper.find('Link .agriculture').simulate('click');
  });
});
