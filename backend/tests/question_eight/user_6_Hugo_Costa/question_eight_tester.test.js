const test = require("tape");

function minMax(array) {
  let low, high;
  for (let i = 0; i < array.length; i++) {
    if (!low) {
      low = array[i];
      high = array[i];
    }
    if (array[i] < low) {
      low = array[i];
    }
    if (array[i] > high) {
      high = array[i];
    }
  }
  return [low, high];
}

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
