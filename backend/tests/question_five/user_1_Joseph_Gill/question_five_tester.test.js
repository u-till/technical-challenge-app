const test = require("tape");

function addition(number) {
  return number + 1;
}

test("should return the next number from the integer passed", function (t) {
  const result = addition(0);
  const expected = 1;
  t.deepEqual(result, expected);
  t.end();
});

test("should return the next number from the integer passed", function (t) {
  const result = addition(9);
  const expected = 10;
  t.deepEqual(result, expected);
  t.end();
});

test("should return the next number from the integer passed", function (t) {
  const result = addition(-3);
  const expected = -2;
  t.deepEqual(result, expected);
  t.end();
});
