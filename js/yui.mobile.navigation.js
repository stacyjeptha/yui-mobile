/*globals YUI, window*/

YUI.add('yuimobile.navigation', function (Y) {

    Y.namespace('Mobile');

    var YM          = Y.Mobile,
        YMW         = YM.Widgets,

        win         = Y.one(window),    
        doc         = Y.one(document),

        transition  = {
            page: true    
        };

    function enhancePage(page) {
    
        var pageWidget = new YMW.Page({
            srcNode: page
        });

        pageWidget.render();

        return pageWidget;
    }

    function transitionPages(destPageWidget, srcPageWidget, callback) {

        var transition = YM.defaultTransitionHandler;

        // Events handling.
        if (srcPageWidget) {
            srcPageWidget.fire('page:beforehide', { nextPage: destPageWidget });
        }

        destPageWidget.fire('page:beforeshow', { prevPage: srcPageWidget || [] });

        // Hide loader.
        YM.widgets.loader.hide();

        // Call transition handler.
        transition(destPageWidget, srcPageWidget, function () {
        
            // Events handling.
            if (srcPageWidget) {
                srcPageWidget.fire('page:hide', { nextPage: destPageWidget }); 
            }

            destPageWidget.fire('page:show', { prevPage: srcPageWidget || [] });
        });

        callback();
    }

    function resetActivePageHeight() {
    
        var page        = Y.one('.' + YM.activePageClass),
            pagePadding = { top: parseFloat(page.getStyle('padding-top')), bottom: parseFloat(page.getStyle('padding-bottom')) },
            pageBorder  = { top: parseFloat(page.getStyle('border-top-width')), bottom: parseFloat(page.getStyle('border-top-width')) };

        page.setStyle('min-height', YM.getScreenHeight() - pagePadding.top - pagePadding.bottom - pageBorder.top - pageBorder.bottom);
    }

    Y.mix(Y.Mobile, {

        changePage: function (destPage) {
        
            var container       = YM.pageContainer,
                srcPageWidget   = YM.activePageWidget || undefined,

                destPageWidget;

            // Set flag to prevent any requests while we are in the middle of a transition.
            transition.page = true;

            // Call Page widget.
            destPageWidget = enhancePage(destPage);

            // Set activePageWidget.
            YM.activePageWidget = destPageWidget;

            // Begin transition.
            transitionPages(destPageWidget, srcPageWidget, function () {
            
                container.fire('pagechange');
            });
        },

        navReady: function () {
        
            Y.on('page:show', resetActivePageHeight); 
        }
    });

}, '1.0.0', { requires: ['widget', 'yuimobile.transition', 'widgets.page', 'widgets.page.sections'] });

