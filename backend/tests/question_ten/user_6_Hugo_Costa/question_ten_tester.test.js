const test = require('tape');



test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
    const result = multiplyAll([[1],[2],[3]]);
    const expected = 6;
    t.deepEqual(result, expected);
    t.end()
    });

test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
    const result = multiplyAll([[1,2],[3,4],[5,6,7]]);
    const expected = 5040;
    t.deepEqual(result, expected);
    t.end()
    });

test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
    const result = multiplyAll([[5,1],[0.2, 4, 0.5],[3, 9]]);
    const expected = 54;
    t.deepEqual(result, expected);
    t.end()
    });