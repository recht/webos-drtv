var kind = require('enyo/kind');
var Collection = require('enyo/Collection');
var DataGridList = require('moonstone/DataGridList');
var Panel = require('moonstone/Panel');
var GridListImageItem = require('moonstone/GridListImageItem');

module.exports = kind({
    name: 'Channels',
    classes: 'moon enyo-fit',
    components: [
        {
            kind: DataGridList,
            fit: true,
            minWidth: 250,
            minHeight: 300,
            collection: new Collection([
                {title: 'DR1', thumbnail: 'http://www.dr.dk/mu/Asset?Id=52d3f40f6187a2077cbac703', feed: 'http://dr01-lh.akamaihd.net/i/dr01_0@147054/master.m3u8?b=100-3000'},
                {title: 'DR2', thumbnail: 'http://www.dr.dk/mu/Asset?Id=52d3f5e66187a2077cbac70c', feed: 'http://dr02-lh.akamaihd.net/i/dr02_0@147055/master.m3u8?b=100-3000'},
                {title: 'DR3', thumbnail: 'http://www.dr.dk/mu/Asset?Id=52d3f60da11f9d0f50f56fd3', feed: 'http://dr03-lh.akamaihd.net/i/dr03_0@147056/master.m3u8?b=100-3000'},
                {title: 'DR Ultra', thumbnail: 'http://www.dr.dk/mu/bar/52d3f6c6a11f9d0f50f56fde', feed: 'http://dr06-lh.akamaihd.net/i/dr06_0@147059/master.m3u8?b=100-3000'},
                {title: 'DR K', thumbnail: 'http://www.dr.dk/mu/Asset?Id=52d3f685a11f9d0f50f56fd6', feed: 'http://dr04-lh.akamaihd.net/i/dr04_0@147057/master.m3u8?b=100-3000'},
                {title: 'DR Ramasjang', thumbnail: 'http://www.dr.dk/mu/bar/52d3f6aca11f9d0f50f56fdb', feed: 'http://dr05-lh.akamaihd.net/i/dr05_0@147058/master.m3u8?b=100-3000'},
            ]),
            components: [
                {kind: GridListImageItem, imageSizing: 'cover', useSubCaption: false, centered: true, bindings: [
                    {from: 'model.title', to: 'caption'},
                    {from: 'model.thumbnail', to: 'source'}
                ]}
            ],
            ontap: 'channelSelected',
        }
    ],
    events: {
        onRequestPushPanel: '',
    },
    channelSelected: function(sender, ev) {
        this.doRequestPushPanel({
            model: {
                ProgramCard: {
                    Title: ev.model.attributes.title,
                },
                // videoUrl: sources[sources.length - 1],
                videoUrl: ev.model.attributes.feed,
            }
        });
});
