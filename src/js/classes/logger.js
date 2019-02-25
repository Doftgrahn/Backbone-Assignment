const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');


const LoginModel = Backbone.Model.extend({
  defaults: {
    current: ''
  }
});

const LoginViewer = Backbone.View.extend({});
console.log(LoginViewer);









class Logger {
  constructor() {
    console.log('Logger module working?');
  }
};





export default Logger;
