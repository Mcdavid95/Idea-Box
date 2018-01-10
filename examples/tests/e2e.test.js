module.exports = new (function () {
  const testCase = this;
  testCase['SignUp page should have heading text SIGN UP'] = function (client) {
    client
      .url('http://localhost:8080/register')
      .waitForElementVisible('.container', 1500)
      .waitForElementVisible('.brand', 1500)
      .expect.element('.brand').text.to.equal('Idea-Box');
    client.end();
  };
  testCase['SignIn page should successfully signIn registered user'] = function (client) {
    client
      .url('http://localhost:8080/login')
      .waitForElementVisible('.container', 1500)
      .waitForElementVisible('.row', 1500)
      .waitForElementVisible('.input-field', 2500)
      .pause(3000)
      .setValue('.username', 'mcdavid')
      .pause(3000)
      .setValue('.password', 'jabike_13')
      .pause(3000)
      .waitForElementVisible('.landing-buttons', 1500)
      .pause(2000)
      .click('.landing-buttons')
      .pause(5000)
      .waitForElementVisible('.show-ideas', 2500)
      .expect.element('.show-ideas').to.be.visible;
    client.end();
  };
  testCase['Signed In users should be able to create an Idea'] = function (client) {
    client
      .url('http://localhost:8080/ideas')
      .waitForElementVisible('.container', 1500)
      .waitForElementVisible('.row', 1500)
      .waitForElementVisible('.show-Ideas', 1500)
      .waitForElementVisible('.modal-trigger', 1500)
      .pause(2000)
      .click('.modal-trigger')
      .pause(3000)
      .waitForElementVisible('.input-field', 1500)
      .waitForElementVisible('.email', 1500)
      .pause(3000)
      .setValue('.email', 'Richie1@testing.com')
      .pause(3000)
      .setValue('.password', 'abc123')
      .pause(3000)
      .waitForElementVisible('.btn-large', 1500)
      .pause(2000)
      .click('.btn-large')
      .pause(5000)
      .waitForElementVisible('.wrapper', 2500)
      .pause(2000)
      .waitForElementVisible('#menu-toggle', 2000)
      .pause(2000)
      .click('#menu-toggle')
      .pause(2000)
      .waitForElementVisible('.toggled', 2000)
      .pause(1500)
      .waitForElementVisible('.title', 2000)
      .setValue('.title', 'e2e Testing')
      .pause(1000)
      .waitForElementVisible('#category', 2000)
      .setValue('#category', 'Information Technology')
      .pause(1000)
      .waitForElementVisible('#textarea1', 3000)
      .setValue('#textarea1', 'e2e testing is sweet sha!!')
      .pause(1500)
      .waitForElementVisible('#create', 3000)
      .expect.element('#create').to.be.visible;
    client.end();
  };
})();
