import ko from 'knockout';


// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
class AppViewModel {
  constructor() {
    this.firstName = ko.observable('Bert');
    this.lastName = ko.observable('Bertington');
    this.fullName = ko.computed(() => `${this.firstName()} ${this.lastName()}`);
  }

  capitalizeLastName() {
    /** @type{string} */
    let currentVal = this.lastName();
    this.lastName(currentVal.toUpperCase());
  }
}

// Activates knockout.js
ko.applyBindings(new AppViewModel(), document.getElementById('root'));
