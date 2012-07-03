/*globals YUI*/

YUI.add('yuimobile.core', function (Y) {

    Y.namespace('Mobile');

    var selectorRE  = /:ym\(([^)]*)\)/g,
        YM          = Y.Mobile;

    YM.Core = {

    };

    // intercept Y.Selector.query method to filter the :ym selector.
    Y.before(function (selector, root, firstOnly, skipNative) {

        selector = selector.replace(selectorRE, '[data-$1]');
        return new Y.Do.AlterArgs('', [selector, root, firstOnly, skipNative]);

    }, Y.Selector, 'query');

}, '1.0.0', { requires: ['node', 'yuimobile.node'] });

