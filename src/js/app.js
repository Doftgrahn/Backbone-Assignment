import Logger from './classes/logger';
import Tabs from './classes/tabs';



class App {
  constructor() {
    new Logger();
    new Tabs();
  }
}

window.addEventListener('load', () => {
  new App();

});
