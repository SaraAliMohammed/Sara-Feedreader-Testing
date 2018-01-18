/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against application.
 */

$(function() {
    /* This suite is all about the RSS feeds definitions, 
    * the allFeeds variable in application.
    */
    describe('RSS Feeds', function() {
        /* It tests to make sure that the allFeeds 
         * variable has been defined and that it is notempty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* It loops through each feed in the allFeeds 
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
            });
        });

        /* It loops through each feed in the allFeeds 
         * object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Name defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The menu', function () { 
        /* It ensures the menu element is hidden by default. */
        it('menu element is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* It ensures the menu changes visibility when 
         * the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
        */
        it('menu changes visibility when the menu icon is clicked', function () {
            var menuLink = $('a.menu-icon-link');
            menuLink.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            menuLink.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });
    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* It ensures when the loadFeed function is 
         * called and completes its work, there is at least
         * a single .entry element within the .feed container. 
         * loadFeed() is asynchronous.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('asynchronous loadFeed has at least a single .entry element', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0)
            done();
        });
    });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* It ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
        var beforeContent, afterContent;
        beforeEach(function (done) {
            loadFeed(0, function () {
                beforeContent = $('.feed').find('h2').text();
                done();
            });
        });

        it('ensures when new feed is loaded that the content changes', function (done) {
            loadFeed(1, function () {
                afterContent = $('.feed').find('h2').text();
                expect(beforeContent).not.toEqual(afterContent);
                done();
            });
        });
    });
}());
