const test = require("tape");

const reverseString = (string) => string.split("").reverse().join("");

test("should reverse the contents of a string", function (t) {
  const result = reverseString("TestString");
  const expected = "gnirtStseT";
  t.deepEqual(result, expected);
  t.end();
});

test("should reverse the contents of a string", function (t) {
  const result = reverseString("Propulsion_Academy");
  const expected = "ymedacA_noisluporP";
  t.deepEqual(result, expected);
  t.end();
});

test("should reverse the contents of a string", function (t) {
  const result = reverseString("HelloWorld!");
  const expected = "!dlroWolleH";
  t.deepEqual(result, expected);
  t.end();
});
