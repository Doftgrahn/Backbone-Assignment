const Backbone = require('backbone');
const $ = require('jquery');
const _ = require('underscore');

const tabTitles = ['Home', 'About', 'History'];

const tabContent = [{
    content: 'Tab1 Content here'
  },
  {
    content: 'tab2 content here'
  },
  {
    content: 'tab3 content here'
  }
];



const TabModel = Backbone.Model.extend({
  defaults: {
    className: 'active',
    selectedTab: 0,
  },
  tab1: function() {
    this.set({
      selectedTab: 0,
    });
  },
  tab2: function() {
    this.set({
      selectedTab: 1,
    });
  },
  tab3: function() {
    this.set({
      selectedTab: 2
    });
  },
  previousButton: function() {
    let oldSelectedTab = this.get('selectedTab');
    let newSelectedTab = oldSelectedTab - 1;
    if (newSelectedTab < 0) {
      newSelectedTab = tabContent.length - 1;
    }
    this.set({selectedTab: newSelectedTab});
  },
  nextButton: function() {
    let oldSelectedTab = this.get('selectedTab');
    let newSelectedTab = oldSelectedTab + 1;
    if (newSelectedTab < tabContent.length + 1) {
      this.set({selectedTab: 0})
    }
    this.set({selectedTab: newSelectedTab});
  }
});

const tabModel = new TabModel;

const ViewTabHeader = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
  },
  render: function() {
    let el = this.$el;
    el.html('');
    tabTitles.forEach((element, index) => {
      let active = index === this.model.get('selectedTab') ? 'active' : '';
      let tabHeader = `<div class="tab ${element} ${active}">${element}</div>`;
      el.append(tabHeader)
    })

  },
  events: {
    "click .Home": 'tabOne',
    "click .About": 'tabTwo',
    "click .History": 'tabThree',
  },
  tabOne: function() {
    this.model.tab1();

  },
  tabTwo: function() {
    this.model.tab2();

  },
  tabThree: function() {
    this.model.tab3();
  }
});

const TabContainer = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model, 'change', this.render)
    this.listenTo(this.model, 'update', this.render)

  },
  render: function() {
    let el = this.$el;
    el.html('');
    let currentTag = this.model.get('selectedTab');
    let prevButton = `<button class="prev">Prec</button>`;
    let nextButton = `<button class="next">Next</button>`;
    let content;
    if (currentTag == 0) {
      content = `<div class="content">${tabContent[0].content}</div>`;
    } else if (currentTag == 1) {
      content = `<div class="content">${tabContent[1].content}</div>`;
    } else if (currentTag == 2) {
      content = `<div class="content">${tabContent[2].content}</div>`;
    }
    this.$el.append(`${prevButton}${content}${nextButton}`);
  },
  events: {
    "change .content": 'showTabs',
    "click .prev": 'previousButton',
    "click .next": 'nextButton'
  },
  previousButton: function() {
    this.model.previousButton()
  },
  nextButton: function() {
    this.model.nextButton()
  }
});

function rendertabContentabHeader() {
  let viewTabs = new ViewTabHeader({
    el: '.b-tabs__header',
    model: tabModel
  });
  viewTabs.render()
}

function rendertabContent() {
  let viewContent = new TabContainer({
    el: '.b-tabs__tabContent',
    model: tabModel
  })
  viewContent.render()
}


export default class Tabs {
  constructor() {
    rendertabContentabHeader()
    rendertabContent()
  }
}
