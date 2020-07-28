const test = require('tape');

const lessThanOrEqualToZero = num => num <= 0

test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(100);
    const expected = false;
    t.deepEqual(result, expected);
    t.end()
    });

test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(0);
    const expected = true;
    t.deepEqual(result, expected);
    t.end()
    });

test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(-21);
    const expected = true;
    t.deepEqual(result, expected);
    t.end()
    });