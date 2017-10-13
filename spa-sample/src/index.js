import './styles/site';

import * as $ from 'jquery';
import ko from 'knockout';
import Sammy from 'sammy';

/**
 * @typedef {Object} Mail
 * @property {number} id
 * @property {string} from
 * @property {string} to
 * @property {string} date
 * @property {string} subject
 * @property {string} messageContent
 * @property {string} folder
 * @description definition of Mail type
 */

class WebmailViewModel {
  constructor() {
    this.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];

    //#region observables properties
    this.chosenFolderId = ko.observable();
    this.chosenFolderData = ko.observable();
    this.chosenMailData = ko.observable();
    //#endregion

    //#region hard bindings functions
    this.goToFolder = this.goToFolder.bind(this);
    this.goToMail = this.goToMail.bind(this);
    //#endregion
    let vmContext = this;

    //#region Defining routing
    Sammy(function() {
      this.get('#:folder', function() {
        vmContext.chosenFolderId(this.params.folder);
        vmContext.chosenMailData(null);
        $.get(
          'http://localhost:2415/mail',
          { folder: this.params.folder },
          vmContext.chosenFolderData
        );
      });

      this.get('#:folder/:mailId', function() {
        vmContext.chosenFolderId(this.params.folder);
        vmContext.chosenFolderData(null);

        // we are always getting the same message just for testing purpose
        $.get('http://localhost:2415/message', vmContext.chosenMailData);
      });

      this.get('', function() {
        this.app.runRoute('get', '#Inbox');
      });
    }).run();
    //#endregion
  }

  /**
   * Changes the active menu
   * @param {string} folder 
   */
  goToFolder(folder) {
    location.hash = folder;
  }

  /**
   * Open an email to display it's content
   * @param {Mail} mail 
   */
  goToMail(mail) {
    location.hash = `${mail.folder}/${mail.id}`;
  }
}

// Activates knockout.js
ko.applyBindings(new WebmailViewModel(), document.getElementById('root'));
