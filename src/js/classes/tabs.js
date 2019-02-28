const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const TabModel = Backbone.Model.extend({
  defalts: {
    class: 'active',
    tab1: 'data-one',
    tab2: 'data-two',
    tab3: 'data-three'
  },
  handleTabs: function(event) {
    console.log('hej');
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

const ViewTabHeader = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'click', this.render)
  },
  render: function() {
    const tabIt = this.model.get('class');

    let headerContent = `<div class="tab">Tab 1</div> <div class="tab">Tab 2</div> <div class="tab">Tab 3</div>`;
    this.$el.html(headerContent);
  },
  events: {
    "click .tab": 'addActiveClass'
  },
  addActiveClass: function(event) {
    this.model.addActive(event);
  }
});

const TabContainer = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let tabOne = this.model.get('tab1');
    let tabTwo = this.model.get('tab2');
    let tabThree = this.model.get('tab3');
    const buttonLeft = `<button id="left">⬅️</button>`;
    const buttonRight = `<button id="right">➡️</button>`;
    const tab1 = `<div class="content"  id="tab1" >content1</div>`;
    const tab2 = `<div class="content" id="tab2" >content1</div>`;
    const tab3 = `<div class="content" id="tab3" >content1</div>`;
    let content;
    console.log(tabOne);

    this.$el.html(tab1);
  },
  events: {
    "click .content": 'handleTabs',
    "click #left": 'leftButton',
    "click #right": 'rightButton'
  },
  handleTabs: function(event) {
    this.model.handleTabs(event)
  },
  leftButton: function(event) {
    this.model.leftButton(event)
  },
  rightButton: function(event) {
    this.model.rightButton(event)
  }
});

function tabHeader() {
  let viewTabs = new ViewTabHeader({
    el: '.b-tabs__header',
    model: tabModel
  });
  viewTabs.render()
};

function tabContent() {
  let viewContent = new TabContainer({
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
