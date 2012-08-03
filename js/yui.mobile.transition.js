/*globals YUI, window*/

YUI.add('yuimobile.transition', function (Y) {

    Y.namespace('Mobile');

    var YM  = Y.Mobile,
        win = Y.one(window),

        createHandler,
        sequentialHandler;

    createHandler = function (sequential) {

        if (sequential === undefined) {
            sequential = true;
        }

        return function (destPageWidget, srcPageWidget, callback) {

            var screenHeight    = YM.getScreenHeight(),

                destScroll      = YM.defaultHomeScroll,
                destPreClass    = 'ym-page-pre-in',

                destPage        = destPageWidget.get('srcNode'),
                srcPage         = srcPageWidget ? srcPageWidget.get('srcNode') : undefined,

                toggleViewportClass, cleanFrom, startOut, doneOut, startIn, doneIn;

            toggleViewportClass = function () {
                
                YM.pageContainer.toggleClass('ym-viewport-transitioning');
            };

            cleanFrom = function () {
            
                srcPage.removeClass(YM.activePage + '|out')
                       .setStyle('height', '');
            };

            startOut = function () {

                doneOut();

                srcPage.setStyle('height', screenHeight + window.pageYOffset)
                       .addClass('out'); 
            };

            doneOut = function () {
            
                if (srcPage && sequential) {
                    cleanFrom();
                }

                startIn();
            };

            startIn = function () {
                
                destPage.addClass(YM.activePageClass + ' ' + destPreClass);

                destPage.setStyle('height', screenHeight + destScroll);

                destPage.removeClass(destPreClass)
                        .addClass('in');

                doneIn();
            };

            doneIn = function () {

                if (!sequential && srcPage) {
                    cleanFrom();
                }
            
                destPage.removeClass('out|in')
                        .setStyle('height', '');

                toggleViewportClass();
            };

            toggleViewportClass();

            if (srcPage) {
                startOut();
            }
            else {
                doneOut();
            }

            callback();
        };
    };

    // Default transition handler.
    YM.defaultTransitionHandler = sequentialHandler = createHandler();

}, '1.0.0', { requires: [] });
