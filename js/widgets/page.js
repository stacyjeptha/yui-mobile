/*globals YUI*/

YUI.add('widgets.page', function (Y) {

    var YM  = Y.Mobile;

    function Page(config) {

        Page.superclass.constructor.apply(this, arguments);
    }

    Page.NAME   = 'Page';
    Page.NS     = 'Widgets';

    Page.ATTRS  = {
        options: {
            value: {}
        }
    };

    Y.extend(Page, Y.Widget, {

        initializer: function () {

            // Publish events.
            this.publish('page:beforehide');
            this.publish('page:beforeshow');
            this.publish('page:hide',       { broadcast: true });
            this.publish('page:show',       { broadcast: true });
            this.publish('page:create',     { broadcast: true });
        },

        bindUI: function () {

            var _self = this;

            this.on('page:beforehide', function () {
            
                _self.removeContainerBackground();
            });

            this.on('page:beforeshow', function () {
            
                _self.setContainerBackground();
            });
        },

        syncUI: function () {
        
            var srcNode = this.get('srcNode');

            srcNode.setAttribute('tabindex', '0')
                   .addClass('ym-page ym-body-c');
        },

        renderUI: function () {
        
            this.fire('page:create');
        },

        removeContainerBackground: function () {
        
            YM.pageContainer.removeClass('ym-overlay-c');
        },

        setContainerBackground: function () {

            YM.pageContainer.addClass('ym-overlay-c');
        }
    });

    Y.namespace('Mobile.Widgets').Page = Page;

}, '1.0.0', { requires: ['widget', 'event-custom'] });
