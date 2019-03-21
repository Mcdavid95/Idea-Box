const initialState = {
  signup: {
    username: '',
    email: '',
    fullname: '',
    loggedIn: false,
    password: ''
  },

  userDetails: {
    username: '',
    email: '',
    fullname: '',
  },

  search: {
    searchTerm: '',
    result: []
  },

  login: {
    username: '',
    password: '',
    isLoggedIn: false
  },

  comment: {
    comment: ''
  },

  getComments: [],

  getCategory: [],

  idea: {
    title: '',
    category: '',
    status: '',
    reactMdeValue: { text: '', selection: null }
  },

  forgotPassword: {
    email: ''
  },

  resetPassword: {
    newPassword: '',
    confirmPassword: '',
    class: 'reset'
  },

  editIdea: {
    title: '',
    description: '',
    category: '',
    status: ''
  },

  getIdea: [],

  userIdeas: [],

  setCurrentUser: {
    isAuthenticated: false,
    user: {}
  },

  getIdeas: []
};

export default initialState;
