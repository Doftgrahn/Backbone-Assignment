const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const TabModel = Backbone.Model.extend({
  defaults: {
    class: 'active',
    tab1: true,
    tab2: false,
    tab3: false
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
  tab1: function() {
    this.set({tab1: true});
    this.set({tab2: false});
    this.set({tab3: false});
  },
  tab2: function() {
    this.set({tab1:false});
    this.set({tab2:true});
    this.set({tab3:false});
  },
  tab3:function() {
    this.set({tab1:false});
    this.set({tab2:false});
    this.set({tab3:true});
  },
  previousButton: function () {
    let tab1 = this.get('tab1');
    let tab2 = this.get('tab2');
    if(tab1) {
      this.tab3();
    } else if(tab2) {
      this.tab1();
    }else {
      this.tab2()
    }
  },
  nextButton: function () {
    let tab1 = this.get('tab1');
    let tab2 = this.get('tab2');
    if(tab1) {
      this.tab2()
    } else if(tab2) {
      this.tab3()
    } else {
      this.tab1()
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

    const tabHeader1 = `<div class="tab" id="one">Tab 1</div>`;
    const tabHeader2 = `<div class="tab" id="two">Tab 2</div>`;
    const tabHeader3 = `<div class="tab" id="three">Tab 3</div>`;
    let headerContent = `${tabHeader1}${tabHeader2}${tabHeader3}`;
    this.$el.html(headerContent);
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
  tabOne: function() {
    this.model.tab1();
  },
  tabTwo: function() {
    this.model.tab2();
  },
  tabThree: function(){
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
  const tab1 = `<div class="content" id="one" >content1</div>`;
  content = tab1;
}
else if (tab2){
  const tab2 = `<div class="content" id="two" >content2</div>`;
  content = tab2;
} else if(tab3){
  const tab3 = `<div class="content" id="three" >content3</div>`;
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
