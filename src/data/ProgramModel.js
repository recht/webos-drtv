var kind = require('enyo/kind');
var Model = require('enyo/Model');
var Source = require('./Source');

module.exports = kind({
    name: 'ProgramModel',
    kind: Model,
    computed: [
        {method: 'thumbnail', path: ['ProgramCard']},
        {method: 'videoUrl', path: ['ProgramCard']}
    ],
    thumbnail: function () {
        var pc = this.get('ProgramCard');
        return pc.Assets[0].Uri;
    },
    videoUrl: function () {
        return 'http://www.dr.dk/mu/MediaRedirector?id=' + encodeURIComponent(this.get('ProgramCard').Urn);
    },
});
