const test = require("tape");

test("should return the first element of an array", function (t) {
  const result = firstElement([1, 2, 3]);
  const expected = 1;
  t.deepEqual(result, expected);
  t.end();
});

test("should return the first element of an array", function (t) {
  const result = firstElement([80, 5, 100]);
  const expected = 80;
  t.deepEqual(result, expected);
  t.end();
});

test("should return the first element of an array", function (t) {
  const result = firstElement([-500, 0, 50]);
  const expected = -500;
  t.deepEqual(result, expected);
  t.end();
});
