(function () {
    "use strict";

    module("UriQueryComponent");

    test("Instantiation", function () {
        var queryString;

        queryString = $ajax.UriQueryComponent.create('foo bar baz');
        deepEqual(queryString.dictionary.items, {}, "should return empty dictionary for invalid query string");

        queryString = $ajax.UriQueryComponent.create('foo=bar&foo=baz&quux=1');
        deepEqual(queryString.dictionary.items, {
            foo : ['bar', 'baz'],
            quux: '1'
        }, "should return dictionary with results");

        queryString = $ajax.UriQueryComponent.create('foo=bar');
        deepEqual(queryString.dictionary.items, {
            foo : 'bar'
        }, "should work with single field-value pair");

        queryString = $ajax.UriQueryComponent.create('foo%3D=bar%26&baz%26=quux%3D');
        deepEqual(queryString.dictionary.items, {
            'foo=': 'bar&',
            'baz&': 'quux='
        }, "should URI decode fields and values");
    });

    test("Conversion from string", function () {
        var queryString = 'foo=bar&foo=baz&quux=1'.toUriQueryComponent();

        ok(queryString.isA($ajax.UriQueryComponent), "should return a UriQueryComponent instance.");
        deepEqual(queryString.dictionary.items, {
            foo : ['bar', 'baz'],
            quux: '1'
        }, "should return dictionary with results");
    });

    test("String conversion", function () {
        equal($ajax.UriQueryComponent.create('').toString(), '',
            "should return empty string for empty dictionary");

        equal($ajax.UriQueryComponent.create('foo=bar&foo=baz&quux=1'),
            'foo=bar&foo=baz&quux=1',
            "should return reconstructed query string");

        equal($ajax.UriQueryComponent.create('foo%3D=bar%26&baz%26=quux%3D'),
            'foo%3D=bar%26&baz%26=quux%3D',
            "should URI encode fields and values");
    });
}());
