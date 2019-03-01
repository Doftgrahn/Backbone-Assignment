const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const tabs = [{
    'tab': 'first',
    'active': true,
    'content': 'lorem ipsum'
  }, {
    'tab': 'second',
    'active': false,
    'content': 'Dolores'
  }
];

const TabModel = Backbone.Model.extend({
  defaults: {
    tab: '',
    active: false,
    content: ''
  },
  toggleActive: function () {
    const active  = this.get('active');
    console.log(this);
    if(active) {
      this.set({active: false});
    }else {
      this.set({active: true});
    }
  }
});

const tabModel = new TabModel;

const TabCollection = Backbone.Collection.extend({
  model: TabModel
});

const tabCollection = new TabCollection(tabs);

const TabView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    this.listenTo(this.collection, 'change', this.render)
  },
  render: function() {
    console.log('render here');
    console.log('render:', this, tabCollection);
    let items = [];
    tabCollection.models.forEach((tab) => {
      let active = tab.attributes.active ? 'active' : '';
      let item = `<div class="tab ${active}">${tab.attributes.tab}</div>`;
      items.push(item);
    })
    this.$el.html(items);
  },
  events: {
    "click .tab": "toggleActive"
  },
  toggleActive: function(event) {
    this.model.toggleActive(event)
  }
})

export default class Tabs {
  constructor() {
    console.log(tabModel);
    let finalView = new TabView({
      el: '.b-tabs__header',
      model: tabModel
    })

    finalView.render();
  }
}
