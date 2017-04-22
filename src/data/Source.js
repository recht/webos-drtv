var AjaxSource = require('enyo/AjaxSource');
var kind = require('enyo/kind');

var Source = kind({
    name: 'Source',
    kind: AjaxSource,
    urlRoot: 'http://www.dr.dk/mu/',
    fetch: function(rec, opts) {
        opts.url = rec.params.method;
        opts.params = {Title: rec.params.title};
        this.inherited(arguments);
    },
});

new Source({name: 'dr'});

module.exports = Source;
