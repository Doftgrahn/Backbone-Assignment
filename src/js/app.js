import Logger from './classes/logger';


class App {
  constructor() {
    new Logger();
    console.log('hej');

}
}



window.addEventListener('load', () =>  {

new App();

});
