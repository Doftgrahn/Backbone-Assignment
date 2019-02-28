import Logger from './classes/logger';
import Tabs from './classes/tabs';
import List from './classes/list';



class App {
  constructor() {
    new Logger();
    new Tabs();
    new List();
  }
}

window.addEventListener('load', () => {
  new App();

});
