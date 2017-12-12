const initialState = {
  signup: {
    username: '',
    email: '',
    fullname: '',
    loggedIn: false,
    password: ''
  },

  login: {
    username: '',
    password: '',
    isLoggedIn: false
  },

  comment: {
    comment: ''
  },

  getCategory: [],

  idea: {
    title: '',
    description: '',
    category: '',
    status: ''
  },

  editIdea: {},

  getIdea: [],

  userIdeas: [],

  setCurrentUser: {
    isAuthenticated: false,
    user: {}
  },

  getIdeas: []
};

export default initialState;
