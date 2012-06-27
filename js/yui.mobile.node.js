/*globals YUI*/

YUI.add('yuimobile.node', function (Y) {

    var prototype = Y.Node.prototype;

    prototype.wrapInner = function (html) {

        console.log(html);

        var wrapper     = Y.Node.create(html),
            container   = wrapper.one('*:empty') || wrapper,
            content     = this.all('> *');

        if (content.size() > 0) {
            content.each(function (node) {
                container.append(node);
            });
        }
        else {
            container.setContent(this.getContent());
            this.setContent('');
        }

        return this.append(wrapper);
    };

    Y.NodeList.importMethod(prototype, 'wrapInner');

}, '1.0.0', { requires: ['node'] });
