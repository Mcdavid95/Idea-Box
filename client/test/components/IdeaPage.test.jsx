import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import initialState from '../../app/initialState';
import { props } from '../__mocks__/components.mock';
import ConnectedIdeasPage, { IdeasPage } from '../../containers/IdeasPage';

Enzyme.configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

describe('Ideas component test', () => {
  it('should render without crashing', () => {
    const component = shallow(<IdeasPage {...props} />);
    expect(component.getElement().type).toBe('div');
  });


  it('has map state to props', () => {
    const component = shallow(<ConnectedIdeasPage {...props} store={store} />);
    expect(component.length).toBe(1);
  });
});
