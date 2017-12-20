import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import initialState from '../../app/initialState';
import mockLocalStorage from '../__mocks__/mockLocalStorage';
import * as actions from '../../actions/idea';
import * as types from '../../app/constants';
import { newIdea, ideaForm, commentForm, search } from '../__mocks__/actions.mocks';
import history from '../../utils/history';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
window.localStorage = mockLocalStorage;
global.history = history;

describe('Create Idea actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should be a function', () => {
    expect(typeof (actions.createIdeaRequest())).toBe('function');
  });

  it('should dispatch CREATE_IDEA_SUCCESS when an idea is successfully created', (done) => {
    moxios.stubRequest('/api/v1/idea', {
      status: 201,
      response: {
        data: {
          message: 'Idea successfully created',
          newIdea
        }
      }
    });
    const expectedActions = [
      { type: types.CREATE_IDEA_SUCCESS }
    ];
    store.dispatch(actions.createIdeaRequest(ideaForm)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch CREATE_IDEA_FAILED when creating an idea fails', (done) => {
    moxios.stubRequest('/api/v1/idea', {
      status: 409,
      response: {
        data: {
          message: 'Title field cannot be empty',
        }
      }
    });
    const expectedActions = [
      { type: types.CREATE_IDEA_FAILED }
    ];
    store.dispatch(actions.createIdeaRequest({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get Public Ideas action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch GET_IDEAS_SUCCESS if successful', (done) => {
    moxios.stubRequest('/api/v1/ideas?currentPage=1', {
      status: 201,
      response: {
        data: {
          ideas: newIdea,
          pages: 1,
          total: 1,
          message: 'Ideas successfully fetched',
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEAS_SUCCESS }
    ];
    store.dispatch(actions.getPublicIdeas(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_IDEAS_ERROR if successful', (done) => {
    moxios.stubRequest('/api/v1/ideas?currentPage=2', {
      status: 400,
      error: {
        response: {
          data: {
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEAS_ERROR }
    ];
    store.dispatch(actions.getPublicIdeas(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get One Idea action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch GET_IDEA_SUCCESS if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}`, {
      status: 201,
      response: {
        data: {
          idea: newIdea,
          message: 'Idea successfully fetched',
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEA_SUCCESS }
    ];
    store.dispatch(actions.getOneIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_IDEA_ERROR if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}`, {
      status: 400,
      error: {
        response: {
          data: {
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEA_ERROR }
    ];
    store.dispatch(actions.getOneIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get User Ideas action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch GET_USER_IDEAS_SUCCESS if successful', (done) => {
    moxios.stubRequest('/api/v1/user/ideas?currentPage=2', {
      status: 201,
      response: {
        data: {
          ideas: newIdea,
          pages: 1,
          total: 1,
        }
      }
    });
    const expectedActions = [
      { type: types.GET_USER_IDEAS_SUCCESS }
    ];
    store.dispatch(actions.getUserIdeas(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_USER_IDEAS_ERROR if successful', (done) => {
    moxios.stubRequest('/api/v1/user/ideas?currentPage=2', {
      status: 400,
      error: {
        response: {
          data: {
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_USER_IDEAS_ERROR }
    ];
    store.dispatch(actions.getUserIdeas(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get User Ideas by Category action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch GET_IDEAS_SUCCESS if it successfully fetches ideas by category', (done) => {
    moxios.stubRequest('/api/v1/ideas/category?category=family&currentPage=2', {
      status: 201,
      response: {
        data: {
          ideas: newIdea,
          pages: 1,
          total: 1,
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEAS_SUCCESS }
    ];
    store.dispatch(actions.getByCategory('family', 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_USER_IDEAS_ERROR if successful', (done) => {
    moxios.stubRequest('/api/v1/ideas/category?category=family&currentPage=2', {
      status: 400,
      error: {
        response: {
          data: {
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEAS_ERROR }
    ];
    store.dispatch(actions.getByCategory('family', 2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Edit User Idea action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch EDIT_IDEA_SUCCESS if it successfully fetches idea', (done) => {
    moxios.stubRequest(`/api/v1/idea/${newIdea._id}`, {
      status: 201,
      response: {
        data: {
          idea: newIdea,
        }
      }
    });
    const expectedActions = [
      { type: types.EDIT_IDEA_SUCCESS }
    ];
    store.dispatch(actions.editIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_USER_IDEAS_ERROR if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea/${newIdea._id}`, {
      status: 400,
      error: {
        response: {
          data: {
          }
        }
      }
    });
    const expectedActions = [
      { type: types.EDIT_IDEA_ERROR }
    ];
    store.dispatch(actions.editIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Update Idea action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch UPDATE_IDEA_SUCCESS if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}`, {
      status: 201,
      response: {
        data: {
          idea: newIdea,
          message: 'Idea successfully fetched',
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEA_SUCCESS }
    ];
    store.dispatch(actions.updateIdea(newIdea._id, newIdea)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch UPDATE_IDEA_ERROR if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}`, {
      status: 400,
      error: {
        response: {
          data: {
          }
        }
      }
    });
    const expectedActions = [
      { type: types.GET_IDEA_ERROR }
    ];
    store.dispatch(actions.getOneIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Comment on Idea action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch CREATE_COMMENT_SUCCESS if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea/${newIdea._id}/comment`, {
      status: 201,
      response: {
        data: {
          newComment: commentForm,
        }
      }
    });
    const expectedActions = [
      { type: types.CREATE_COMMENT_SUCCESS }
    ];
    store.dispatch(actions.sendComment(commentForm, newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch CREATE_COMMENT_ERROR if unsuccessful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}/comment`, {
      status: 400,
      error: {
        response: {
          data: {
            message: 'could not send comment'
          }
        }
      }
    });
    const expectedActions = [
      { type: types.CREATE_COMMENT_ERROR }
    ];
    store.dispatch(actions.sendComment(commentForm, newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Get Comments action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch GET_COMMENTS_SUCCESS if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea/${newIdea._id}/comment`, {
      status: 201,
      response: {
        data: {
          comments: commentForm,
        }
      }
    });
    const expectedActions = [
      { type: types.GET_COMMENTS_SUCCESS }
    ];
    store.dispatch(actions.getComments(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch GET_COMMENTS_ERROR if unsuccessful', (done) => {
    moxios.stubRequest(`/api/v1/idea/${newIdea._id}/comment`, {
      status: 400,
      response: {
        data: {
          message: 'could not send comment'
        }
      }
    });
    const expectedActions = [
      { type: types.GET_COMMENTS_ERROR }
    ];
    store.dispatch(actions.getComments(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Delete action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch DELETE_IDEA_SUCCESS, if successful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}`, {
      status: 201,
      response: {
        data: {
          idea: newIdea,
        }
      }
    });
    const expectedActions = [
      { type: types.DELETE_IDEA_SUCCESS, }
    ];
    store.dispatch(actions.deleteIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch DELETE_IDEA_ERROR if unsuccessful', (done) => {
    moxios.stubRequest(`/api/v1/idea?id=${newIdea._id}`, {
      status: 400,
      response: {
        error: {
          data: {
            message: 'could not send comment'
          }
        }
      }
    });
    const expectedActions = [
      { type: types.DELETE_IDEA_ERROR }
    ];
    store.dispatch(actions.deleteIdea(newIdea._id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Search action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('should dispatch SEARCH_SUCCESS, if successful', (done) => {
    moxios.stubRequest('/api/v1/ideas/search?offset=0', {
      status: 201,
      response: {
        data: {
          idea: newIdea,
        }
      }
    });
    const expectedActions = [
      { type: types.SEARCH_SUCCESS, }
    ];
    store.dispatch(actions.searchIdea(search, 0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch SEARCH_ERROR if unsuccessful', (done) => {
    moxios.stubRequest('/api/v1/ideas/search?offset=0', {
      status: 400,
      error: {
        response: {
          data: {
            message: 'could not send comment'
          }
        }
      }
    });
    const expectedActions = [
      { type: types.SEARCH_ERROR }
    ];
    store.dispatch(actions.searchIdea(search, 0)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
