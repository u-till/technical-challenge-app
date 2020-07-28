const test = require("tape");

const sum = (x, y) => x + y;

test("function should return the sum of two numbers", function (t) {
  const result = sum(1, 2);
  const expected = 3;
  t.deepEqual(result, expected);
  t.end();
});

test("function should return the sum of two numbers", function (t) {
  const result = sum(4, 10);
  const expected = 14;
  t.deepEqual(result, expected);
  t.end();
});

test("function should return the sum of two numbers", function (t) {
  const result = sum(10, -1);
  const expected = 9;
  t.deepEqual(result, expected);
  t.end();
});
