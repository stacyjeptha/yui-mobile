/*global YUI, window*/

YUI().use(['yuimobile.node', 'yuimobile.core', 'yuimobile.navigation', 'widgets.loader'], function (Y) {

    var YM          = Y.Mobile,
        YMW         = YM.Widgets,

        win         = Y.one(window),
        html        = Y.one('html'),

        pageHTML    = '<div data-role="page"></div>';

    // set-up objects.
    Y.Mobile.widgets = {};

    // set-up events.
    Y.publish('pagecreate', { context: YM });

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

        win.fire('pagecontainercreate');

        // show loader.
        YM.widgets.loader.show();

        // remove rending class.
        hideRenderingClass();

        YM.changePage(YM.firstPage);
    }

    setTimeout(hideRenderingClass, 5000);

    YM.navReady();

    window.scrollTo(0, 1);
    YM.defaultHomeScroll = (window.pageYOffest === 1) ? 0 : 1;

    buildPage();
});
