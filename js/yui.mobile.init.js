/*global YUI*/

YUI().use([
    'yuimobile.core',
    'yuimobile.node',
    'yuimobile.page'
], function (Y) {

    var YM = Y.Mobile;

    Y.mix(YM, {

        pageHTML: '<div data-role="page"></div>',

        buildPage: function () {

            var pages = Y.all(':ym(role=page)');

            // create a page if none exists.
            if (!pages.size()) {
                pages = Y.one('body').wrapInner(this.pageHTML);
            }

            // define first page.
            YM.firstPage = pages.item(0);

            // define page container.
            YM.pageContainer = pages.item(0).get('parentNode').addClass('ym-viewport');
        }
    });


    window.scrollTo(0, 1);
    YM.buildPage();
});
