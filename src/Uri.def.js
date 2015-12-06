$oop.postpone($ajax, 'Uri', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @name $ajax.Uri.create
     * @function
     * @param {string} [uriString]
     * @returns {$ajax.Uri}
     */

    /**
     * Represents a Uniform Resource Identifier.
     * @link http://www.rfc-base.org/txt/rfc-3986.txt
     * @class
     * @extends $oop.Base
     * @extends $utils.Stringifiable
     */
    $ajax.Uri = self
        .addConstants(/** @lends $ajax.Uri */{
            /**
             * Regular expression for matching URIs.
             * @link http://labs.apache.org/webarch/uri/rfc/rfc3986.html#regexp
             * @type {RegExp}
             * @constant
             * -----------------( scheme  )----------( host  )-------( path )-------(query)------(fg)----
             */
            RE_URI_PARSER: /^(?:([^:\/?#]+):)?(?:\/\/([^/?#]*))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
        })
        .addMethods(/** @lends $ajax.Uri# */{
            /**
             * @param {string} [uriString]
             * @ignore
             */
            init: function (uriString) {
                $assertion.isStringOptional(uriString, "Invalid URI string");

                var uriComponents = uriString && uriString.match(self.RE_URI_PARSER);

                /**
                 * URI scheme component (ftp, http, mailto, mshelp, ymsgr, etc)
                 * @type {string}
                 */
                this.scheme = uriComponents && uriComponents[1];

                /**
                 * URI authority component (host, user:pwd@host, etc)
                 * @type {string}
                 */
                this.authority = uriComponents && uriComponents[2];

                var path = uriComponents && uriComponents[3];

                /**
                 * URI path component
                 * @type {string}
                 */
                this.path = path && path.toUriPathComponent();

                var query = uriComponents && uriComponents[4];

                /**
                 * URI query component (http GET REST api, etc)
                 * @type {$ajax.UriQueryComponent}
                 */
                this.query = query && query.toUriQueryComponent();

                /**
                 * URI fragment component (html anchor, etc)
                 * @type {string}
                 */
                this.fragment = uriComponents && uriComponents[5];
            },

            /**
             * Clones the current Uri instance.
             * @returns {$ajax.Uri}
             */
            clone: function () {
                return this.toString().toUri();
            },

            /**
             * Stringifies the current Uri instance.
             * @returns {string}
             */
            toString: function () {
                return [
                    this.scheme + '://',
                    this.authority,
                    this.path && ('/' + this.path),
                    this.query && ('?' + this.query),
                    this.fragment && ('#' + this.fragment)
                ].join('');
            }
        });
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends $assertion */{
        /** @param {$ajax.Uri} expr */
        isUri: function (expr) {
            return $ajax.Uri.isBaseOf(expr);
        },

        /** @param {$ajax.Uri} [expr] */
        isUriOptional: function (expr) {
            return typeof expr === 'undefined' ||
                $ajax.Uri.isBaseOf(expr);
        }
    });

    $oop.extendBuiltIn(String.prototype, /** @lends String# */{
        /**
         * Converts string to a Uri instance.
         * @returns {$ajax.Uri}
         */
        toUri: function () {
            return $ajax.Uri.create(this.valueOf());
        }
    });
}());
