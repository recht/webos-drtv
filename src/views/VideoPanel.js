var kind = require('enyo/kind');
var VideoHeaderBackground = require('moonstone/VideoInfoBackground');
var VideoInfoHeader = require('moonstone/VideoInfoHeader');
var VideoPlayer = require('moonstone/VideoPlayer');
var Button = require('moonstone/Button');
var HistorySupport = require('moonstone/HistorySupport');

module.exports = kind({
    name: 'VideoPanel',
    // kind: Panel,
    // layoutKind: FittableLayout.Columns,
    mixins: [HistorySupport],
    classes: 'moon enyo-fit enyo-unselectable',
    // fit: true,
    components: [
        {kind: VideoPlayer, name: 'player', inline: false, autoplay: true, sources: [], infoComponents: [
            {kind: VideoHeaderBackground, background: true, fit: true, components: [
                {kind: VideoInfoHeader, name: 'videoheader'}
            ]}
            // {kind: VideoInfoHeader, name: 'header'},
        ], components: [
            // {kind: IconButton, src: '@../assets/icon-like.png', ontap: 'feature1'},
            {kind: Button, content: 'Exit', ontap: 'stop'}
        ]},
    ],
    bindings: [
        {from: 'model.ProgramCard.Title', to: '$.videoheader.title'},
        {from: 'model.videoUrl', to: '$.player.src'},
    ],
    show: function() {
        this.inherited(arguments);
        console.log('push');
        this.pushBackHistory();
    },
    stop: function() {
        console.log('stop');
        this.doStopVideo();
    },
    events: {
        onStopVideo: '',
    },
    unload: function() {
        this.$.player.unload();
    },
    backKeyHandler: function() {
        this.stop();
        // this.bubble('ontap');
        return true;
    }
    // create: function() {
    //     this.inherited(arguments);
    //     this.$.player.toggleFullscreen();
    //     // this.$.player.unload();

    // },
});
