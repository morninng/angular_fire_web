'use strict';

describe('Filter: DateMonthDate', function () {

  // load the filter's module
  beforeEach(module('mixideaWebApp'));

  // initialize a new instance of the filter before each test
  var DateMonthDate;
  beforeEach(inject(function ($filter) {
    DateMonthDate = $filter('DateMonthDate');
  }));

  it('should return the input prefixed with "DateMonthDate filter:"', function () {
    var text = 'angularjs';
    expect(DateMonthDate(text)).toBe('DateMonthDate filter: ' + text);
  });

});
