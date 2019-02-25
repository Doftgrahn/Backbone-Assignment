import Logger from './classes/logger';


class App {
  constructor() {
    new Logger();
  }
}

window.addEventListener('load', () => {
  new App();

});
