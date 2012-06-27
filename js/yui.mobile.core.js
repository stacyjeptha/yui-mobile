/*globals YUI*/

YUI.add('yuimobile.core', function (Y) {

    var selectorRE = /:ym\(([^)]*)\)/g;

    Y.namespace('Mobile');

    Y.Mobile.Core = {

    };

    // intercept Y.Selector.query method to filter the :ym selector.
    Y.before(function (selector, root, firstOnly, skipNative) {

        selector = selector.replace(selectorRE, '[data-$1]');
        return new Y.Do.AlterArgs('', [selector, root, firstOnly, skipNative]);

    }, Y.Selector, 'query');


}, '1.0.0', { requires: ['node', 'selector'] });

