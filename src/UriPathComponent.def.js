$oop.postpone($ajax, 'UriPathComponent', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @name $ajax.UriPathComponent.create
     * @function
     * @param {string} uriPath
     * @returns {$ajax.UriPathComponent}
     */

    /**
     * @class
     * @extends $oop.Base
     */
    $ajax.UriPathComponent = self
        .addMethods(/** @lends $ajax.UriPathComponent# */{
            /**
             * @param {string} uriPath
             * @ignore
             */
            init: function (uriPath) {
                /**
                 * @type {$data.Path}
                 */
                this.path = uriPath ?
                    uriPath.split('/').map(decodeURIComponent).toPath() :
                    [].toPath();
            },

            /** @returns {string} */
            toString: function () {
                return this.path.asArray
                    .map(encodeURIComponent)
                    .join('/');
            }
        });
});

(function () {
    "use strict";

    $assertion.addTypes(/** @lends $assertion */{
        /** @param {$ajax.UriPathComponent} expr */
        isUriPathComponent: function (expr) {
            return $ajax.UriPathComponent.isBaseOf(expr);
        },

        /** @param {$ajax.UriPathComponent} [expr] */
        isUriPathComponentOptional: function (expr) {
            return typeof expr === 'undefined' ||
                $ajax.UriPathComponent.isBaseOf(expr);
        }
    });

    $oop.extendBuiltIn(String.prototype, /** @lends String# */{
        /**
         * Converts string to a UriPathComponent instance.
         * @returns {$ajax.UriPathComponent}
         */
        toUriPathComponent: function () {
            return $ajax.UriPathComponent.create(this.valueOf());
        }
    });
}());
