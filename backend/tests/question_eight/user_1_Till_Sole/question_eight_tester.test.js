const test = require("tape");

test("should return both the minimum and maximum numbers, in an array, in that order", function (t) {
  const result = minMax([1, 2, 3, 4, 5]);
  const expected = [1, 5];
  t.deepEqual(result, expected);
  t.end();
});

test("should return both the minimum and maximum numbers, in an array, in that order", function (t) {
  const result = minMax([2334454, 5]);
  const expected = [5, 2334454];
  t.deepEqual(result, expected);
  t.end();
});

test("should return both the minimum and maximum numbers, in an array, in that order", function (t) {
  const result = minMax([1]);
  const expected = [1, 1];
  t.deepEqual(result, expected);
  t.end();
});
