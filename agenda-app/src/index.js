import ko from 'knockout';


class AppViewModel {
  constructor() {
    this.firstName = 'Alexis';
    this.lastName = 'David';
  }
}

ko.applyBindings(new AppViewModel(), document.getElementById('root'));
