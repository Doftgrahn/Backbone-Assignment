const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const data = [{
    artist: 'Picasso',
    artForm: 'Cubism',

  },
  {
    artist: 'Salvador Dali',
    artForm: 'Surrealism'
  },
  {
    artist: 'Leonardo da Vinci',
    artForm: 'Classic Art'
  },
  {
    artist: 'Jennie Erlandsson',
    artForm: 'Abstract minimalism (aka pilla)'
  }
];

const ListModel = Backbone.Model.extend({
  defaults: {
    artist: null,
    artForm: null,
    edit: false,
    formArtist: null,
    formArtform: null
  },
  editArtists: function() {
    this.set({
      edit: true,
      formArtist: this.get('artist'),
      formArtform: this.get('artForm')
    })
  },
  saveArtists: function() {
    this.set({
      edit: false,
      artist: this.get('formArtist'),
      artForm: this.get('formArtform')
    });
  }
});

const ListCollection = Backbone.Collection.extend({
  model: ListModel
});
const listCollection = new ListCollection(data);


const ArtistView = Backbone.View.extend({
  tag: 'li',
  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function() {
    let artistForm = this.model.get('formArtist');
    let artFormForm = this.model.get('formArtform');
    let edit = `<span class="edit">🖊️</span>`;
    let remove = `<span class="delete">💣</span>`;
    let content;
    if (this.model.get('edit')) {
      let artist = `<input class="editArtist" value="${artistForm}"/>`;
      let artForm = `<input class="editArtForm" value="${artFormForm}"/>`;
      let saveArtist = `<span class="save">✔️</span>`;
      content = `${artist} ${artForm} ${saveArtist} ${remove}`;
    } else {
      let name = this.model.get('artist');
      let artForm = this.model.get('artForm');
      content = `${name} painted ${artForm}  ${edit} ${remove}`;
    }
    this.$el.html(content);
  },
  events: {
    "click .delete": 'delete',
    "click .edit": 'editArtistsAll',
    "click .save": 'saveArtists',
    "change .editArtist": 'editArtist',
    "change .editArtForm": 'editArtform'
  },
  delete: function(event) {
    listCollection.remove(this.model);
  },
  editArtistsAll: function(event) {
    this.model.editArtists();
  },
  saveArtists: function(event) {
    this.model.saveArtists();
  },
  editArtist: function(event) {
    this.model.set({
      formArtist: event.target.value
    });
  },
  editArtform: function(event) {
    this.model.set({
      formArtform: event.target.value
    });
  }
});

const ArtistViewList = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'update', this.render);
    this.listenTo(this.collection, 'change', this.render);
  },
  render: function() {
    let el = this.$el;
    let ul = $('<ul></ul>');
    //////
    this.collection.forEach(function(artist) {
      let artistView = new ArtistView({
        model: artist
      });
      artistView.render();
      ul.append(artistView.$el);
    });
    el.html('');
    el.append(ul);
    let addForm = `<input type="text" id="inputArtist"/>
    <input type="text" id="inputArtform"/>
    <button type="button" id="addArtistButton">Add!</button>`;
    el.append(addForm);
  },
  events: {
    "click #addArtistButton": 'addArtistButtonClick',
    "change #inputArtist": 'onArtistChange',
    "change #inputArtform": 'onArtFormChange'
  },
  addArtistButtonClick: function(event) {
    let model = new ListModel({
      artist: this.form.artist,
      artForm: this.form.artForm
    });
    this.collection.add(model);
  },
  form: {
    artist: '',
    artForm: ''
  },
  onArtistChange: function(event) {this.form.artist = event.target.value;},
  onArtFormChange: function(event) {this.form.artForm = event.target.value;},
});

export default class List {
  constructor() {
    let artistViewListAll = new ArtistViewList({
      collection: listCollection,
      el: '.b-list__container'
    })
    artistViewListAll.render()
  }
}
