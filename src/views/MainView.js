/**
    For simple applications, you might define all of your views in this file.
    For more complex applications, you might choose to separate these kind definitions
    into multiple files under this folder and require() them as needed.

    Notice the IconButton's src property value uses an '@' notation URI, which represents
    the relative filepath from the current module source. It will be evaluated and normalized
    during building with enyo-dev.
*/

var
    kind = require('enyo/kind'),
    Panels = require('moonstone/Panels'),
    Panel = require('moonstone/Panel'),
    BodyText = require('moonstone/BodyText'),
    IconButton = require('moonstone/IconButton'),
    Button = require('moonstone/Button'),
    Spotlight = require('spotlight'),
    HistorySupport = require('moonstone/HistorySupport');

var i18n = require('enyo/i18n');
ilib = require('enyo-ilib');
i18n.updateLocale('da-DK');

var SearchPanel = require('./SearchPanel');
var VideoPanel = require('./VideoPanel');
var Channels = require('./Channels');

// var MainPanel = kind({
//     name: 'MainPanel',
//     classes: 'moon enyo-fit',
//     components: []
// })

module.exports = kind({
    name: 'MainView',
    // kind: Panels,
    classes: 'moon enyo-fit main-view',
    // pattern: 'activity',
    components: [
        {kind: Panels, useHandle: false, onShowingChanged: 'handleShowingChanged', classes: 'enyo-fit', pattern: 'activity', popOnBack: true, components: [
            {kind: Panel, title: 'DR TV', components:[{kind: Channels}]},
            {kind: SearchPanel}
            // {kind: pl}
        ]},
        {kind: VideoPanel, name: 'videopanel', showing: false}
    ],
    handlers: {
        onRequestPushPanel: 'pushPanel',
        onStopVideo: 'stopVideo',
    },
    pushPanel: function(sender, ev) {
        console.log('pushpanel', ev.model);
        // this.$.panels.pushPanel(ev.panel);
        // this.$.panels.setHandleShowing(false);
        this.$.panels.hide();
        // this.$.videopanel.set('showing', true);
        this.$.videopanel.unload();
        this.$.videopanel.show();
        this.$.videopanel.set('model', ev.model);
        // this.$.videopanel.load();
    },
    // rendered: function() {
    //     console.log('rendered');
    //     this.inherited(arguments);
    //     Spotlight.spot(this.$.panels);
    // },
    handleShowingChanged: function(sender, ev) {
        console.log('handle showing', sender);
        this.$.panels.setHandleShowing(false);
    },
    panelsShowingChanged: function(sender, ev) {
        // this.$.videopanel.
        console.log('showing changed');
    },
    stopVideo: function() {
        this.$.videopanel.unload();
        this.$.videopanel.hide();
        this.$.panels.show();
    },
});
