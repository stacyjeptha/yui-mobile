/*globals YUI*/

/*
 * YUI Mobile page unit tests
 */
YUI().use('test', 'yuimobile.page', function (Y) {

    Y.namespace('yuimobile.test');

    Y.yuimobile.test.DebugTestCase = new Y.Test.Case({

        name: 'Debug Tests',

        testDebug: function () {
            
            var Assert = Y.Assert;
            Assert.isTrue(true);
        }
    });

    Y.yuimobile.test.PageSuite = new Y.Test.Suite('Page Suite');
    Y.yuimobile.test.PageSuite.add(Y.yuimobile.test.DebugTestCase);

    Y.Test.Runner.add(Y.yuimobile.test.PageSuite);

    Y.Test.Runner.run();
});
