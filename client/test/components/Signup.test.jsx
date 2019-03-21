import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { user, props } from '../__mocks__/components.mock';
import SignupForm from '../../components/SignupForm';

Enzyme.configure({ adapter: new Adapter() });

describe('Signup form component test', () => {
  it('should contain the method onChange', () => {
    const component = mount(<SignupForm {...props} />);
    const onChangeSpy = jest.spyOn(component.instance(), 'onChange');
    component.instance().onChange({
      target: {
        name: user
      }
    });
    expect(onChangeSpy).toHaveBeenCalledTimes(1);
  });
  it('should contain the method onSubmit', () => {
    const e = {
      preventDefault: jest.fn()
    };
    const component = shallow(<SignupForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
