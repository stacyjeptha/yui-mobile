/*global YUI*/

YUI().use([
    'yuimobile.core',
    'widgets.page',
    'widgets.loader',
], function (Y) {

    var YM          = Y.Mobile,
        YMW         = YM.Widgets,

        html        = Y.one('html');
        pageHTML    = '<div data-role="page"></div>';

    // set-up objects.
    YM.widgets = {};

    // set-up events.
    Y.publish('ym:pagecreate', { context: YM })

    // set-up rendering CSS classes.
    html.addClass('ym ym-rendering');

    function hideRenderingClass() {
    
        html.removeClass('ym-rendering');
    }

    function buildPage() {

        var pages = Y.all(':ym(role=page)');

        // create a page if none exists.
        if (!pages.size()) {
            pages = Y.one('body').wrapInner(this.pageHTML);
        }

        YM.firstPage        = pages.item(0);
        YM.pageContainer    = pages.item(0).get('parentNode').addClass('ym-viewport');

        Y.fire('ym:pagecreate');

        // show loader.
        YM.widgets.loader.show();

        // remove rending class.
        hideRenderingClass();
    };

    setTimeout(hideRenderingClass, 5000);

    window.scrollTo(0, 1);
    buildPage();
});
