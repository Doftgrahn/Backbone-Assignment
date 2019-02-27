const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const TabModel = Backbone.Model.extend({
  defalts: {
    state: '',
    class: 'active'
  },
  addActive: function(event) {
    this.element = event.target;
    console.log('klickas det', this.element);
    this.element.classList.add('active');
  },
  removeActive: function(event) {

  }
});

const tabModel = new TabModel;

const ViewTabs = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.mode, 'change', this.render)
  },
  render: function() {
    let headerContent = `<div class="b-tabs__header"><div class="tab">Tab 1</div><div class="tab">Tab 2</div><div class="tab">Tab 3</div></div>`;
    let tabsContent = `<div class="b-tabs__tabContent"><div></div></div>`;
    let content = `${headerContent}${tabsContent}`;
    this.$el.html(content);
  },
  events: {
    "click .tab": 'addActiveClass',
    "click": 'removeActive'
  },
  addActiveClass: function(event) {
    this.model.addActive(event);
  },
  removeActive: function(event) {
    this.model.removeActive(event)
  }
});

const TabelViewContent = Backbone.View.extend({
  initialize: function() {
    this.ListenTo(this.model, 'change', this.render)
  },
  render: function() {
    console.log('hej');
  },
  events: {
    "click": 'addActiveClass',
    "click": 'removeActive'
  },
  addActiveClass: function(event) {
    this.model.addActive(event);
  },
  removeActive: function(event) {
    this.model.removeActive(event)
  }
});



function viewTabsfinal() {
  let viewTabs = new ViewTabs({
    el: '.b-tabs__wrapper',
    model: tabModel
  });
  viewTabs.render()
};


export default class Tabs {
  constructor() {
    viewTabsfinal()

  }
}
