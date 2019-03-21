import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../app/initialState';
import { user, props, nextProps } from '../__mocks__/components.mock';
import ConnectedEditIdeaPage, { EditIdeaPage } from '../../containers/EditIdeaPage';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('Edit Idea component test', () => {
  it('should call the method onChange', () => {
    const component = shallow(<EditIdeaPage {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: user
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the method onSubmit', () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = shallow(<EditIdeaPage {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });


  it('should call the method handeSelectChange', () => {
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'public'
      }
    };
    const component = shallow(<EditIdeaPage {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'handleSelectChange');
    component.instance().handleSelectChange(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the method componentWillReceiveProps', () => {
    const component = shallow(<EditIdeaPage {...props} />);
    component.setState({
      comments: []
    });
    const componentWillReceivePropsSpy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    component.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });


  it('has map state to props', () => {
    const component = shallow(<ConnectedEditIdeaPage {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
