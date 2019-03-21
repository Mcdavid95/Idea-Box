import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { user, props } from '../__mocks__/components.mock';
import CreateIdea from '../../components/CreateIdea';

Enzyme.configure({ adapter: new Adapter() });

describe('Create Idea component test', () => {
  it('should call the method onChange', () => {
    const component = shallow(<CreateIdea {...props} />);
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
    const component = shallow(<CreateIdea {...props} />);
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
    const component = shallow(<CreateIdea {...props} />);
    const onSubmitSpy = jest.spyOn(component.instance(), 'handleSelectChange');
    component.instance().handleSelectChange(event);
    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
  });
});
