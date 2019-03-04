const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const TabModel = Backbone.Model.extend({
  defaults: {
    class: 'active',
    tab1: true,
    tab2: false,
    tab3: false,
    tabElem1: '',
    tabElem2: '',
    tabElem3: ''
  },
  addActive: function(event) {
    this.active = document.querySelector('.active');
    let active = this.get('class');
    this.element = event.target;
    if (this.active && this.active != this.element) {
       this.active.classList.remove('active');

    }
    this.element.classList.add('active');
  },
  tab1: function() {
    this.set({tab1: true});
    this.set({tab2: false});
    this.set({tab3: false});
  },
  tab2: function(event) {
    this.set({tab1:false});
    this.set({tab2:true});
    this.set({tab3:false});
  },
  tab3:function(event) {
    this.set({tab1:false});
    this.set({tab2:false});
    this.set({tab3:true});
  },
  previousButton: function () {
    let tab1 = this.get('tab1');
    let tab2 = this.get('tab2');
    if(tab1) {
      this.tab3();
      let active = this.get('tabElem3');
      let prev = this.get('tabElem1');
      active.classList.add('active');
      prev.classList.remove('active');
    } else if(tab2) {
      this.tab1();
      let active = this.get('tabElem1');
      let prev = this.get('tabElem2');
      active.classList.add('active');
      prev.classList.remove('active');
    }else {
      this.tab2()
      let active = this.get('tabElem2');
      let prev = this.get('tabElem3');
      active.classList.add('active');
      prev.classList.remove('active');
    }
  },
  nextButton: function () {
    let tab1 = this.get('tab1');
    let tab2 = this.get('tab2');
    if(tab1) {
      this.tab2();
      let active = this.get('tabElem2');
      let prev = this.get('tabElem1');
      active.classList.add('active');
      prev.classList.remove('active');
    } else if(tab2) {
      this.tab3();
      let active = this.get('tabElem3');
      let prev = this.get('tabElem2');
      active.classList.add('active');
      prev.classList.remove('active');
    } else {
      this.tab1();
      let active = this.get('tabElem1');
      let prev = this.get('tabElem3');
      active.classList.add('active');
      prev.classList.remove('active');
    };
  }
});

const tabModel = new TabModel;

const ViewTabHeader = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'click', this.render)
  },
  render: function() {
    const tabIt = this.model.get('class');
    const tabHeader1 = `<div class="tab active" id="one">Home</div>`;
    const tabHeader2 = `<div class="tab" id="two">About</div>`;
    const tabHeader3 = `<div class="tab" id="three">History</div>`;

    let headerContent = `${tabHeader1}${tabHeader2}${tabHeader3}`;
    this.$el.html(headerContent);

    this.model.set({tabElem1 : document.querySelector('#one')});
    this.model.set({tabElem2 : document.querySelector('#two')});
    this.model.set({tabElem3 : document.querySelector('#three')});
  },
  events: {
    "click .tab": 'addActiveClass',
    "click #one": 'tabOne',
    "click #two": 'tabTwo',
    "click #three":'tabThree'
  },
  addActiveClass: function(event) {
    this.model.addActive(event);
  },
  tabOne: function(event) {
    this.model.tab1();
  },
  tabTwo: function(event) {
    this.model.tab2();
  },
  tabThree: function(event){
    this.model.tab3();
  }
});

const TabContainer = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let tab1 = this.model.get('tab1');
    let tab2 = this.model.get('tab2');
    let tab3 = this.model.get('tab3');
    const prevButton = `<button id="prev">prev</button>`;
    const nextButton = `<button id="next">next</button>`;
    let content;
if(tab1) {
  const tab1 = `<div class="content" id="one" >Welcome!</div>`;
  content = tab1;
}
else if (tab2){
  const tab2 = `<div class="content" id="two">heeleleoo</div>`;
  content = tab2;
} else if(tab3){
  const tab3 = `<div class="content" id="three" >my tabs!</div>`;
  content = tab3;
}

    this.$el.html(`${prevButton}${content}${nextButton}`);
  },
  events: {
    "change .content": 'showTabs',
    "click #prev": 'previousButton',
    "click #next": 'nextButton'
  },
  addActiveClass: function(event) {
    this.model.addActiveClass(event)
  },
  showTabs: function(event) {
    this.model.showTabs(event)
  },
  previousButton: function() {
    this.model.previousButton()
  },
  nextButton:function() {
    this.model.nextButton()
  }
});

function tabHeader() {
  let viewTabs = new ViewTabHeader({
    el: '.b-tabs__header',
    model: tabModel
  });
  viewTabs.render()
}

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
