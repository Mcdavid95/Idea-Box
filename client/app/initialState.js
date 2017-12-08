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

  idea: {
    title: '',
    description: '',
    category: '',
    status: ''
  }
};

export default initialState;
