export const props = {
  addUserRequest: jest.fn(() => Promise.resolve()),
  currentGroup: jest.fn(() => Promise.resolve()),
  allUsers: [],
  searchUsers: jest.fn(() => Promise.resolve()),
  groupId: '',
  getAllUsers: jest.fn(() => Promise.resolve()),
  userSignupRequest: jest.fn(() => Promise.resolve()),
  createGroupRequest: jest.fn(() => Promise.resolve()),
  groupMembers: jest.fn(() => Promise.resolve()),
  userLoginRequest: jest.fn(() => Promise.resolve()),
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
  getGroupMessages: jest.fn(() => Promise.resolve()),
  getUserGroups: jest.fn(() => Promise.resolve()),
  groupMessages: [],
  postMessageRequest: jest.fn(() => Promise.resolve()),
  setAuthToken: {
    isAuthenticated: false
  },
  logout: jest.fn(() => Promise.resolve()),
};

export const nextProps = {
  addUserRequest: jest.fn(() => Promise.resolve()),
  allUsers: [{ users: [{ id: 3, username: 'mcdavid' }] }],
  memberList: [[{ id: 2, username: 'mcdavid' }]],
  groupId: '',
  result: [{
    users: { users: [{
      username: 'melody'
    }] }
  }],
  getAllUsers: jest.fn(() => Promise.resolve()),
  userGroupList: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }], [{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
  props: {
    userGroupList: [[{ groupId: 3, groupName: 'mcdavid', description: 'nothing' }, { groupId: 4, groupName: 'laugh', description: 'nothing' }]],
    memberList: [[{ id: 2, username: 'mcdavid' }, { id: 3, username: 'love' }], [{ id: 2, username: 'mcdavid' }, { id: 3, username: 'love' }]],
    groupMessages: [[{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }], [{ messages: 'mcdavid', priority: 'nothing' }, { groupId: 4, groupName: 'laugh', priority: 'nothing' }]],

  },
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

