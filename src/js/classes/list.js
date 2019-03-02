const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const data = [{
    instrument: 'Saxophone',
    key: 'Bb',

  },
  {
    instrument: 'trumpet',
    key: 'Bb',
  },
  {
    instrument: 'Guitarr',
    key: 'less',
  }
];

const ListModel = Backbone.Model.extend({
  defaults: {
    instrument: '',
    sort: '',
    key: null,
    strings: false
  }
});

const ListCollection = Backbone.Collection.extend({
  model: ListModel
});
const listCollection = new ListCollection({data});





const ViewList = Backbone.View.extend({});






export default class List {
  constructor() {}
}
