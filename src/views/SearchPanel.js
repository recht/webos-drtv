var kind = require('enyo/kind');
var Collection = require('enyo/Collection');
var DataGridList = require('moonstone/DataGridList');
var Panel = require('moonstone/Panel');
var GridListImageItem = require('moonstone/GridListImageItem');
var ProgramModel = require('../data/ProgramModel');

var SearchCollection = kind({
    name: 'SearchCollection',
    kind: Collection,
    model: ProgramModel,
    source: 'dr',
    published: {
        searchText: null,
    },
    options: {
        parse: true,
    },
    searchTextChanged: function() {
        this.empty({destroy: true});
        this.fetch();
    },
    fetch: function(opts) {
        this.params = {
            title: '$like(\'' + this.searchText + '\')',
            method: 'search/view/bundles-with-public-asset',
        }
        return this.inherited(arguments);
    },
    parse: function(data) {
        return data && data.Data;
    }
});

module.exports = kind({
    name: 'SearchPanel',
    kind: Panel,
    title: 'Search DR',
    titleBelow: 'Enter search term above',
    headerOptions: {inputMode: true, dismissOnEnter: true},
    create: function() {
        this.inherited(arguments);
        this.set('list', new SearchCollection());
    },
    bindings: [
        {from: 'list', to: '$.resultList.collection'}
    ],
    handlers: {
        onInputHeaderChange: 'search'
    },
    events: {
        onRequestPushPanel: '',
    },
    components: [
        {kind: DataGridList, fit: true, name: 'resultList', minWidth: 250, minHeight: 300, components: [
            {kind: GridListImageItem, imageSizing: 'cover', useSubCaption: false, centered: false, bindings: [
                {from: 'model.ProgramCard.Title', to: 'caption'},
                {from: 'model.thumbnail', to: 'source'}
            ]}
        ], ontap: 'itemSelected'}
    ],
    search: function (sender, ev) {
        this.$.resultList.collection.set('searchText', ev.originator.get('value'));
    },
    itemSelected: function(sender, ev) {
        this.doRequestPushPanel({
            // panel: {kind: VideoPanel, model: ev.model}
            model: ev.model
        });
    }
});
