import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { user, props } from '../__mocks__/components.mock';
import CommentForm from '../../components/CommentForm';

Enzyme.configure({ adapter: new Adapter() });

describe('Comment form component test', () => {
  it('should call the method onChange', () => {
    const component = shallow(<CommentForm {...props} />);
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
    const component = shallow(<CommentForm {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit(e);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
