'use strict';

describe('Filter: DateValueString', function () {

  // load the filter's module
  beforeEach(module('mixideaWebApp'));

  // initialize a new instance of the filter before each test
  var DateValueString;
  beforeEach(inject(function ($filter) {
    DateValueString = $filter('DateValueString');
  }));

  it('should return the input prefixed with "DateValueString filter:"', function () {
    var text = 'angularjs';
    expect(DateValueString(text)).toBe('DateValueString filter: ' + text);
  });

});
