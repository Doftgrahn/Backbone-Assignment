const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const LoginModel = Backbone.Model.extend({
  defaults: {
    isLoggedin: true
  },
  handler: function(event) {
    let defaultValue = this.get('isLoggedin');
    if (defaultValue) {
      this.set({
        isLoggedin: false
      })
    } else {
      this.set({
        isLoggedin: true
      })
    }
  }
});

const loginModel = new LoginModel;
const LoginViewer = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let isLoggedIn = this.model.get('isLoggedin');
    let signInText = `Logga in!`;
    let signOutText = `Logga ut!`;
    let signInButton = `<button id="loginButton">${signInText}</button>`;
    let logOutButton = `<button id="loginButton">${signOutText}</button>`;
    if (isLoggedIn) {
      this.$el.html(signInButton);
    } else {
      this.$el.html(logOutButton);
    }
  },
  events: {
    "click #loginButton": 'clickHandler'
  },
  clickHandler: function(event) {
    this.model.handler(event);
  }
});

function renderItAll() {
  let finalViewer = new LoginViewer({
    el: '.b-login__container',
    model: loginModel
  });
  finalViewer.render()
}

export default class Logger {
  constructor() {
    renderItAll()
  }
};
