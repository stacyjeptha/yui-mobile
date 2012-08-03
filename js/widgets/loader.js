/*globals window, YUI*/

YUI.add('widgets.loader', function (Y) {

    var YM              = Y.Mobile,

        win             = Y.one(window),
        html            = Y.one('html'),
       
        BOUNDING_BOX    = 'boundingBox',
        CONTENT_BOX     = 'contentBox',

        OFFSET_LEFT     = 'offsetLeft',
        OFFSET_TOP      = 'offsetTop';

    function Loader(config) {
        
        Loader.superclass.constructor.apply(this, arguments);
    }

    Loader.NAME = 'Loader';
    Loader.NS   = 'Widgets';

    Loader.DEFAULT_TEMPLATE =
        '<div class="ym-loader">' +
            '<span class="ym-icon ym-icon-loading"></span>' +
        '</div>';

    Loader.ATTRS = {
        loadingText: {
            value: '...'
        }
    };

    Y.extend(Loader, Y.Widget, {

        /**
         * Local storage of the loader node.
         *
         * @property _loader
         */
        _loader: null,

        /**
         * @method initializer
         * @param {Object} config
         */
        initializer: function (config) {},

        /**
         * @method destructor
         */
        destructor: function () {},

        /**
         * Render the loader node.
         *
         * @method renderUI
         */
        renderUI: function () {
   
            this._loader = Y.Node.create(Loader.DEFAULT_TEMPLATE);
            this.get(CONTENT_BOX).appendChild(this._loader);
        },

        /**
         * Show loader.
         *
         * @method show
         */
        show: function () {

            html.addClass('ym-loading');
            this._loader.addClass('ym-corner-all ym-body-a ym-loader-default');
        },

        /**
         * Hide loader.
         *
         * @method hide
         */
        hide: function () {
        
            html.removeClass('ym-loading');
        }
    });

    Y.namespace('Mobile.Widgets').Loader = Loader;

    win.on('pagecontainercreate', function () {

        Y.Mobile.widgets.loader = YM.widgets.loader || new YM.Widgets.Loader().render();
    });

}, '1.0.0', { requires: ['widget'] });
