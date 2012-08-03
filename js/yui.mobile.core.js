/*globals YUI, window*/

YUI.add('yuimobile.core', function (Y) {

    Y.namespace('Mobile');

    var YM              = Y.Mobile,
        win             = Y.one(window),

        selectorRE      = /:ym\(([^)]*)\)/g;

    Y.Mobile = {

        activePageClass: 'ym-page-active',

        getScreenHeight: function () {
            
            return window.innerHeight || win.getComputedStyle('height');
        }
    };

    // intercept Y.Selector.query method to filter the :ym selector.
    Y.before(function (selector, root, firstOnly, skipNative) {

        selector = selector.replace(selectorRE, '[data-$1]');
        return new Y.Do.AlterArgs('', [selector, root, firstOnly, skipNative]);

    }, Y.Selector, 'query');

}, '1.0.0', { requires: ['node', 'yuimobile.node'] });

