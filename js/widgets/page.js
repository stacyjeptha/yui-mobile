/*globals YUI*/

YUI.add('widgets.page', function (Y) {

    function Page(config) {

        Page.superclass.constructor.apply(this, arguments);
    }

    Page.NAME   = 'Page';
    Page.NS     = 'Widgets';

    Y.extend(Page, Y.Widget, {

        initializer: function () {

        }
    });

    Y.namespace('Mobile.Widgets').Page = Page;

}, '1.0.0', { requires: ['widget', 'event-custom'] });
