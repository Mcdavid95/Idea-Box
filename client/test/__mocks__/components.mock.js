export const props = {
  getCurrentIdeas: jest.fn(() => Promise.resolve()),
  userLoginRequest: jest.fn(() => Promise.resolve()),
  getPublicIdeas: jest.fn(() => Promise.resolve()),
  forgotPassword: jest.fn(() => Promise.resolve()),
  currentIdea: {
    _id: '5a3280b0cf6ee47520416ae9',
    title: 'junk',
    description: '__halo__\n\nlove to my mamama',
    categories: 'Family',
    comments: [],
    author: {
      id: '5a27f252a8942373221d69da',
      username: 'mcdavid'
    },
    modified: true,
    status: 'public',
    createdAt: '2017-12-14T13:46:24.765Z',
    __v: 0,
    updatedAt: '2017-12-15T05:37:58.455Z'
  },
  getCategory: [{
    ideas: [
      {
        title: 'hate',
        description: 'no love'
      },
    ]
  }
  ],
  getIdeas: [{
    ideas: [
      {
        title: 'hate',
        description: 'no love'
      },
    ]
  }
  ],
  id: '1',
  comments: [[{
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  },
  {
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  }],
  [{
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  },
  {
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  }]],
  getIdea: [''],
  searchUsers: jest.fn(() => Promise.resolve()),
  updateIdea: jest.fn(() => Promise.resolve()),
  category: 'education',
  getComments: jest.fn(() => Promise.resolve()),
  userSignupRequest: jest.fn(() => Promise.resolve()),
  getByCategory: jest.fn(() => Promise.resolve()),
  logout: jest.fn(),
  createIdeaRequest: jest.fn(() => Promise.resolve()),
  memberList: [[{ id: 2, username: 'mcdavid' }]],
  userGroupList: [],
  match: {
    params: { groupId: 1 }
  },
  userDetails: {
    user: {
      name: 'mcdavid',
      email: 'mcdave@gmail.com'
    }
  },
  editIdea: jest.fn(() => Promise.resolve()),
  confirmPasswordReset: jest.fn(() => Promise.resolve()),
  getOneIdea: jest.fn(() => Promise.resolve()),
  groupMessages: [],
  sendComment: jest.fn(() => Promise.resolve()),
  setAuthToken: {
    isAuthenticated: false
  },
};

export const nextProps = {
  getIdeas: [{
    ideas: [
      {
        title: 'hate',
        description: 'no love'
      },
    ]
  },
  {
    ideas: [
      {
        title: 'hate',
        description: 'no love'
      },
    ]
  }
  ],
  getCategory: [{
    ideas: [
      {
        title: 'hate',
        description: 'no love'
      },
    ]
  },
  {
    ideas: [
      {
        title: 'hate',
        description: 'no love'
      },
    ]
  }
  ],
  getIdea: [''],
  currentIdea: {
    _id: '5a3280b0cf6ee47520416ae9',
    title: 'junk',
    description: '__halo__\n\nlove to my mamama',
    categories: 'Family',
    comments: [],
    author: {
      id: '5a27f252a8942373221d69da',
      username: 'mcdavid'
    },
    modified: true,
    status: 'public',
    createdAt: '2017-12-14T13:46:24.765Z',
    __v: 0,
    updatedAt: '2017-12-15T05:37:58.455Z'
  },
  addUserRequest: jest.fn(() => Promise.resolve()),
  allUsers: [{ users: [{ id: 3, username: 'mcdavid' }] }],
  memberList: [[{ id: 2, username: 'mcdavid' }]],
  category: '',
  result: [{
    users: {
      users: [{
        username: 'melody'
      }]
    }
  }],
  getAllUsers: jest.fn(() => Promise.resolve()),
  userGroupList: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }], [{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
  props: {
    userGroupList: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
    memberList: [[{ id: 2, username: 'mcdavid' }, { id: 3, username: 'love' }], [{ id: 2, username: 'mcdavid' }, { id: 3, username: 'love' }]],
    groupMessages: [[{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }], [{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }]],

  },

  comments: [[{
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  },
  {
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  }],
  [{
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  },
  {
    content: 'hi',
    author: {
      username: 'mcdavid'
    }
  }]],
  groupMessages: [[{ messages: 'mcdavid', priority: 'nothing' }, { message: 'laugh', priority: 'nothing' }]],
  match: {
    params: { groupId: 1 }
  },
  setAuthToken: {
    isAuthenticated: false
  },
};

export const target = {
  name: 'username', description: 'mcdavid'
};

export const user = {
  name: 'username', value: 'mcdavid'
};

