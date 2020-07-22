const test = require("tape");

const countVowels = (string) => {
  let vowels = ["a", "e", "i", "o", "u"];
  let result = 0;
  string.split("").map((letter) => {
    if (vowels.includes(letter)) {
      result++;
    }
  });
  return result;
};

test("returns the number of vowels ( a, e, i, o, u ) contained within it", function (t) {
  const result = countVowels("Celebration");
  const expected = 5;
  t.deepEqual(result, expected);
  t.end();
});

test("returns the number of vowels ( a, e, i, o, u ) contained within it", function (t) {
  const result = countVowels("Palm");
  const expected = 1;
  t.deepEqual(result, expected);
  t.end();
});

test("returns the number of vowels ( a, e, i, o, u ) contained within it", function (t) {
  const result = countVowels("Prediction");
  const expected = 4;
  t.deepEqual(result, expected);
  t.end();
});
