// Amara, universalsubtitles.org
// 
// Copyright (C) 2012 Participatory Culture Foundation
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see 
// http://www.gnu.org/licenses/agpl-3.0.html.

goog.provide('unisubs.subtitle.CompletedDialog');

/**
 * @constructor
 * @private
 */
unisubs.subtitle.CompletedDialog = function(completed, callback) {
    goog.ui.Dialog.call(this, 'unisubs-modal-completed', true);
    this.setButtonSet(null);
    this.setDisposeOnHide(true);
    this.completed_ = completed;
    this.callback_ = callback;
};
goog.inherits(unisubs.subtitle.CompletedDialog, goog.ui.Dialog);

unisubs.subtitle.CompletedDialog.prototype.createDom = function() {
    unisubs.subtitle.CompletedDialog.superClass_.createDom.call(this);
    var $d = goog.bind(this.getDomHelper().createDom, this.getDomHelper());
    this.getElement().appendChild($d('h3', null, "Entire video completed?"));
    this.checkboxSpan_ = $d('span', this.completed_ ? "goog-checkbox-checked" : "goog-checkbox-unchecked");
    this.getElement().appendChild(
        $d('div', null,
           $d('p', null, 
              this.checkboxSpan_,
              goog.dom.createTextNode(
                  'These subtitles cover all dialog in the entire video.'))));
    this.okButton_ = 
        $d('a', 
           {'href':'#', 
            'className': "unisubs-green-button unisubs-big"}, 
           'OK');
    this.getElement().appendChild(this.okButton_);
    var clearDiv = $d('div');
    unisubs.style.setProperty(clearDiv, 'clear', 'both');
    clearDiv.innerHTML = "&nbsp;";
    this.getElement().appendChild(clearDiv);
};

unisubs.subtitle.CompletedDialog.prototype.enterDocument = function() {
    unisubs.subtitle.CompletedDialog.superClass_.enterDocument.call(this);
    if (!this.checkbox_) {
        this.checkbox_ = new goog.ui.Checkbox(
            this.completed_ ? goog.ui.Checkbox.State.CHECKED : goog.ui.Checkbox.State.UNCHECKED);
        this.checkbox_.decorate(this.checkboxSpan_);
        this.checkbox_.setLabel(
            this.checkbox_.getElement().parentNode);
    }
    this.getHandler().listen(
        this.okButton_, 'click', this.okClicked_);
};

unisubs.subtitle.CompletedDialog.prototype.okClicked_ = function(e) {
    e.preventDefault();
    this.setVisible(false);
    this.callback_(this.checkbox_.isChecked());
};

/**
 * @param {boolean} completed
 * @param {function(boolean)} callback
 */
unisubs.subtitle.CompletedDialog.show = function(completed, callback) {
    var dialog = new unisubs.subtitle.CompletedDialog(
        completed, callback);
    dialog.setVisible(true);
};
