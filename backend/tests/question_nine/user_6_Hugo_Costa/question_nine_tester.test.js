const test = require('tape');

function charCount(char, string) {
   return string.split('').filter(index => index === char).length
}

test('should return the number of times the first string (single character) appears in the second string', function(t) {
    const result = charCount('a', 'edabit');
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });

test('should return the number of times the first string (single character) appears in the second string', function(t) {
    const result = charCount('c', 'Chamber of secrets');
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });

test('should return the number of times the first string (single character) appears in the second string', function(t) {
    const result = charCount('7', '10795426697');
    const expected = 2;
    t.deepEqual(result, expected);
    t.end()
    });