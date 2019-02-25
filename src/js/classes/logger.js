const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const LoginModel = Backbone.Model.extend({
  defaults: {
    isLoggedin: false
  }
});

const loginModel = new LoginModel;


const LoginViewer = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let isLoggedIn = this.model.get('isLoggedIn');
    let logInButton;
    if (isLoggedIn !== false) {
      logInButton = `<button id="loginButton">Sign in!</button>`;
    } else {
      logInButton = `<button id="loginButton">Sign out!</button>`;
    }
    this.$el.html(logInButton);
  },
  events: {
    "click loginButton": 'logInEvent'
  },
  logInEvent: function(event) {
    let loggedIn = this.model.get('isLoggedIn');
    if (loggedIn == false) {
      console.log('hej');
    }
  }
});



function renderItAll() {
  let finalViewer = new LoginViewer({
    el: '.b-login__container',
    model: loginModel
  });
  finalViewer.render()
}


class Logger {
  constructor() {
    renderItAll()
  }
};


export default Logger;
