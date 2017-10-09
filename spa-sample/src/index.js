import * as $ from 'jquery';
import ko from 'knockout';

class WebmailViewModel {
  constructor() {
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];

    //#region observables properties
    this.choosenFolderId = ko.observable();
    this.choosenFolderData = ko.observable();
    //#endregion

    //#region hard bindings functions
    this.goToFolder = this.goToFolder.bind(this);
    //#endregion

    // selecting the first menu option to display emails
    this.goToFolder('Inbox');
  }

  /**
   * Changes the active menu
   * @param {string} folder 
   */
  goToFolder(folder) {
    this.choosenFolderId(folder);

    $.get(
      'http://localhost:2415/mail',
      { folder: folder },
      this.choosenFolderData
    );
  }
}

// Activates knockout.js
ko.applyBindings(new WebmailViewModel(), document.getElementById('root'));
