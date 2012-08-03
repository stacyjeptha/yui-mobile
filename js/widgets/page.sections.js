/*globals YUI*/

YUI.add('widgets.page.sections', function (Y) {

    var YM = Y.Mobile;

    Y.on('page:create', function (e) {
    
        var pageWidget      = e.target,
            pageNode        = pageWidget.get('srcNode'),
            options         = pageWidget.get('options'),
            role            = pageNode.getAttribute('data-role');

        Y.mix(options, {
            headerTheme     : 'a',
            footerTheme     : 'a',
            contentTheme    : null
        });
    
        pageNode.all(':ym(role=header), :ym(role=content), :ym(role=footer)').each(function (node) {
        
            var role = node.getAttribute('data-role'),
                nodeTheme;

            node.addClass('ym-' + role);

            if (role === 'header' || role === 'footer') {
                nodeTheme = (role === 'header') ? options.headerTheme : options.footerTheme;

                node.addClass('ym-bar-' + nodeTheme)
                    .setAttribute('role', (role === 'header') ? 'banner' : 'contentinfo');

                node.all('h1, h2, h3, h4, h5, h6').addClass('ym-title')
                                                  .setAttribute('role', 'heading')
                                                  .setAttribute('aria-level', 1);
            }
            else if (role === 'content') {
                node.setAttribute('role', 'main');
            }

        });
    });

}, '1.0.0', { requires: ['widgets.page'] });
