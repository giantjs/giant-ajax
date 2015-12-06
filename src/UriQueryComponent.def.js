$oop.postpone($ajax, 'UriQueryComponent', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @name $ajax.UriQueryComponent.create
     * @function
     * @param {string} [query]
     * @returns {$ajax.UriQueryComponent}
     */

    /**
     * @class
     * @extends $oop.Base
     * @extends $utils.Stringifiable
     */
    $ajax.UriQueryComponent = self
        .addConstants(/** @lends $ajax.UriQueryComponent */{
            /**
             * @type {RegExp}
             * @constant
             */
            RE_QUERY_VALIDATOR: /^([^&=]+=[^&=]+)+(&[^&=]+=[^&=]+)*$/
        })
        .addPrivateMethods(/** @lends $ajax.UriQueryComponent# */{
            /**
             * @param {string} queryString
             * @returns {$data.Dictionary}
             * @private
             * @memberOf $ajax.Uri
             */
            _queryStringToDictionary: function (queryString) {
                var result = $data.Dictionary.create(),
                    fieldValuePairs,
                    fieldValuePairCount,
                    i, fieldValuePair;

                if (self.RE_QUERY_VALIDATOR.test(queryString)) {
                    fieldValuePairs = queryString.split('&');
                    fieldValuePairCount = fieldValuePairs.length;

                    for (i = 0; i < fieldValuePairCount; i++) {
                        fieldValuePair = fieldValuePairs[i].split('=')
                            .map(decodeURIComponent);
                        result.addItem(fieldValuePair[0], fieldValuePair[1]);
                    }
                }

                return result;
            },

            /**
             * @param {$data.Dictionary} dictionary
             * @returns {string}
             * @private
             * @memberOf $ajax.Uri
             */
            _dictionaryToQueryString: function (dictionary) {
                var result = [];
                dictionary
                    .forEachItem(function (value, key) {
                        result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                    });
                return result.join('&');
            }
        })
        .addMethods(/** @lends $ajax.UriQueryComponent# */{
            /**
             * @param {string} [query]
             * @ignore
             */
            init: function (query) {
                $assertion.isStringOptional(query, "Invalid query string");

                /** @type {$data.Dictionary} */
                this.dictionary = self._queryStringToDictionary(query || '');
            },

            /** @returns {string} */
            toString: function () {
                return self._dictionaryToQueryString(this.dictionary);
            }
        });
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends $assertion */{
        /** @param {$ajax.UriQueryComponent} expr */
        isUriQueryComponent: function (expr) {
            return $ajax.UriQueryComponent.isBaseOf(expr);
        },

        /** @param {$ajax.UriQueryComponent} [expr] */
        isUriQueryComponentOptional: function (expr) {
            return typeof expr === 'undefined' ||
                $ajax.UriQueryComponent.isBaseOf(expr);
        }
    });

    $oop.extendBuiltIn(String.prototype, /** @lends String# */{
        /**
         * Converts string to a UriQueryComponent instance.
         * @returns {$ajax.UriQueryComponent}
         */
        toUriQueryComponent: function () {
            return $ajax.UriQueryComponent.create(this.valueOf());
        }
    });
}());
