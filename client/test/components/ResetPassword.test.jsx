import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../app/initialState';
import { user, props } from '../__mocks__/components.mock';
import ConnectedResetPassword, { ResetPassword } from '../../containers/ResetPassword';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('Comment form component test', () => {
  it('should call the method onChange', () => {
    const component = shallow(<ResetPassword {...props} />);
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
    const component = shallow(<ResetPassword {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the method showPassword', () => {
    const component = mount(<ResetPassword {...props} />);
    component.setState({
      class: 'reset-password'
    });
    const showPasswordSpy = jest.spyOn(component.instance(), 'showPassword');
    component.instance().showPassword();
    expect(showPasswordSpy).toHaveBeenCalledTimes(1);
  });

  it('has map state to props', () => {
    const component = shallow(<ConnectedResetPassword {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
