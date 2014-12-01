/**
 * feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/**
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /**
   * This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    // Test to ensure the allFeeds variable has been defined and not empty
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // This test loops through each feed in the allFeeds object
    // and checks if the name and url are defined and not empty
    // for each feed.
    it('have names and URLs defined', function() {
      for (var i in allFeeds) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    });
  });


  /**
   * This test suite is for testing correct functionality of the menu drawer.
   */
  describe('The menu', function() {
    var body = $('body');

    // Tests to ensure the menu drawer is hidden by default.
    it('is hidden by default', function() {
      expect(body.hasClass('menu-hidden')).toBeTruthy();
    });

    /**
     * This inner test suite tests the behavior of the menu drawer on click events.
     */
    describe('icon is clicked,', function() {

      // Trigger click event on menu icon before each function call.
      beforeEach(function() {
        $('.menu-icon-link').trigger('click');
      });

      // Test to ensure the menu drawer has appeared.
      it('and the menu is displayed correctly', function() {
        expect(body.hasClass('menu-hidden')).toBeFalsy();
      });

      // Test to ensure the menu drawer is hidden again.
      it('and the menu is hidden correctly', function() {
        expect(body.hasClass('menu-hidden')).toBeTruthy();
      });
    });
  });


  /**
   * This test suite is for testing loadFeed() function when page is loaded.
   */
  describe('Initial Entries', function() {

    // Call loadFeed() for initial entries. loadFeed() function will call done() when it's done.
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    // Test to ensure there is at least a single .entry element
    // within the .feed container.
    it('has been loaded', function(done) {
      expect($('.feed').children().length).toBeGreaterThan(0);
      done();
    });
  });


  /**
   * This test suite is for testing loadFeed() function when new feed is selected.
   */
  describe('New Feed Selection', function() {
    var entryTexts;

    // Store the content of the initial screen
    // then load the new feed.
    beforeEach(function(done) {
      entryTexts = $('.feed').find('h2').text();
      loadFeed(1, done);
    });

    // Test to ensure that content is actually changed
    // when a new feed is loaded.
    it('has been loaded', function(done) {
      expect($('.feed').find('h2').text()).not.toBe(entryTexts);
      done();
    });

    // Go back to initial feed when finish.
    afterEach(function(done) {
      loadFeed(0, done);
    });
  });
}());