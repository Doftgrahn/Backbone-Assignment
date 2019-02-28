const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const TabModel = Backbone.Model.extend({
  defalts: {
    class: 'active',
    tab1: 'tab1',
    tab2: 'tab2',
    tab3: 'tab3'
  },
  handleTabs: function(event) {
    console.log('klickas det?');
  },
  addActive: function(event) {
    this.element = event.target;
    this.active = document.querySelector('.active');
    if (this.active && this.active != this.element) {
      this.active.classList.remove('active');
      this.set({
        class: ''
      });
    }
    this.element.classList.add('active');
    this.set({
      class: 'active'
    });
  },
  leftButton: function() {
    console.log('leftButton');
  },
  rightButton: function() {
    console.log('rightButton');
  }
});

const tabModel = new TabModel;
const anothertabModel = new TabModel;

const ViewTabHeader = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'click', this.render)
  },
  render: function() {
    const tabIt = this.model.get('class');
    let headerContent = `<div class="tab" data-id=tab1>Tab 1</div> <div class="tab" data-id="tab2">Tab 2</div> <div class="tab" data-id=tab3>Tab 3</div>`;
    this.$el.html(headerContent);
  },
  events: {
    "click .tab": 'addActiveClass'
  },
  addActiveClass: function(event) {
    this.model.addActive(event);
  }
});

const TabContainerOne = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    const tab1 = `<button id="left">⬅️</button><div class="content" id="tab1" >content1</div><button id="right">➡️</button>`;
    const tab2 = `<div class="content" id="tab2" ><button>⬅️</button>content2<button>➡️</button></div>`;
    const tab3 = `<div class="content" id="tab3" ><button>⬅️</button>content3<button>➡️</button></div>`;
    this.$el.html(tab1);
  },
  events: {
    "change .content": 'handleTabs',
    "click #left": 'leftButton',
    "click #right": 'rightButton'
  },
  handleTabss: function(event) {
    this.model.handleTabs()
  },
  leftButton: function(event) {
    this.model.leftButton()
  },
  rightButton: function(event) {
    this.model.rightButton()
  }
});

function tabHeader() {
  let viewTabs = new ViewTabHeader({
    el: '.b-tabs__header',
    model: anothertabModel
  });
  viewTabs.render()
};

function tabContent() {
  let viewContent = new TabContainerOne({
    el: '.b-tabs__tabContent',
    model: tabModel
  })
  viewContent.render()
}


export default class Tabs {
  constructor() {
    tabHeader()
    tabContent()

  }
}
