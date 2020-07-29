const test = require('tape');

const addUp = num => {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    result += i
  }
  return result
}

test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
    const result = addUp(4);
    const expected = 10;
    t.deepEqual(result, expected);
    t.end()
    });

test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
    const result = addUp(1);
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });

test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
    const result = addUp(600);
    const expected = 180300;
    t.deepEqual(result, expected);
    t.end()
    });