const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');



const TabModel = Backbone.Model.extend({
  defalts: {
    class: 'active'
  },
  addActive: function(event) {
    event.target.ClassList.add('active')
  },
  removeActive: function(event) {
    event.target.classList.remove('active');
  }
});

const tabModel = new TabModel;

const ViewTabs = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.mode, 'change', this.render)
  },
  render: function() {
    let headerContent = `<div class="b-tabs__header"><div>Tab 1</div><div>Tab 2</div><div>Tab 3</div></div>`;
    let tabsContent = `<div class="b-tabs__tabContent"><div>content</div></div>`;
    let content = `${headerContent}${tabsContent}`;
    this.$el.html(content);
  }
})

const TabelViewContent = Backbone.View.extend({
  initialize: function() {
    this.ListenTo(this.model, 'change', this.render)
  },
  render: function() {
    console.log('render this');
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
