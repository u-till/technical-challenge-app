# Strings for Tape tests, used in the file written by the tests/view.py to run the Tape tests

question_one_tapes = {
    "one": """test('function should return the sum of two numbers', function(t) {
    const result = sum(1,2);
    const expected = 3;
    t.deepEqual(result, expected);
    t.end();
    });""",

    "two": """test('function should return the sum of two numbers', function(t) {
    const result = sum(4,10);
    const expected = 14;
    t.deepEqual(result, expected);
    t.end();
    });""",

    "three": """test('function should return the sum of two numbers', function(t) {
    const result = sum(10,-1);
    const expected = 9;
    t.deepEqual(result, expected);
    t.end();
    });"""
}

question_two_tapes = {
    "one": """test('should reverse the contents of a string', function(t) {
    const result = reverseString('TestString');
    const expected = 'gnirtStseT';
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should reverse the contents of a string', function(t) {
    const result = reverseString('Propulsion_Academy');
    const expected = 'ymedacA_noisluporP';
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should reverse the contents of a string', function(t) {
    const result = reverseString('HelloWorld!');
    const expected = '!dlroWolleH';
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_three_tapes = {
    "one": """test('should return the first element of an array', function(t) {
    const result = firstElement([1, 2, 3]);
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should return the first element of an array', function(t) {
    const result = firstElement([80, 5, 100]);
    const expected = 80;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should return the first element of an array', function(t) {
    const result = firstElement([-500, 0, 50]);
    const expected = -500;
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_four_tapes = {
    "one": """test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(100);
    const expected = false;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(0);
    const expected = true;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(-21);
    const expected = true;
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_five_tapes = {
    "one": """test('should return the next number from the integer passed', function(t) {
    const result = addition(0);
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should return the next number from the integer passed', function(t) {
    const result = addition(9);
    const expected = 10;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should return the next number from the integer passed', function(t) {
    const result = addition(-3);
    const expected = -2;
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_six_tapes = {
    "one": """test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
    const result = addUp(4);
    const expected = 10;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
    const result = addUp(1);
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
    const result = addUp(600);
    const expected = 180300;
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_seven_tapes = {
    "one": """test('returns the number of vowels ( a, e, i, o, u ) contained within it', function(t) {
    const result = countVowels("Celebration");
    const expected = 5;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('returns the number of vowels ( a, e, i, o, u ) contained within it', function(t) {
    const result = countVowels("Palm");
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('returns the number of vowels ( a, e, i, o, u ) contained within it', function(t) {
    const result = countVowels("Prediction");
    const expected = 4;
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_eight_tapes = {
    "one": """test('should return both the minimum and maximum numbers, in an array, in that order', function(t) {
    const result = minMax([1, 2, 3, 4, 5]);
    const expected = [1, 5];
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should return both the minimum and maximum numbers, in an array, in that order', function(t) {
    const result = minMax([2334454, 5]);
    const expected = [5, 2334454];
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should return both the minimum and maximum numbers, in an array, in that order', function(t) {
    const result = minMax([1]);
    const expected = [1, 1];
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_nine_tapes = {
    "one": """test('should return the number of times the first string (single character) appears in the second string', function(t) {
    const result = charCount('a', 'edabit');
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should return the number of times the first string (single character) appears in the second string', function(t) {
    const result = charCount('c', 'Chamber of secrets');
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should return the number of times the first string (single character) appears in the second string', function(t) {
    const result = charCount('7', '10795426697');
    const expected = 2;
    t.deepEqual(result, expected);
    t.end()
    });"""
}

question_ten_tapes = {
    "one": """test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
    const result = multiplyAll([[1],[2],[3]]);
    const expected = 6;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "two": """test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
    const result = multiplyAll([[1,2],[3,4],[5,6,7]]);
    const expected = 5040;
    t.deepEqual(result, expected);
    t.end()
    });""",

    "three": """test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
    const result = multiplyAll([[5,1],[0.2, 4, 0.5],[3, 9]]);
    const expected = 54;
    t.deepEqual(result, expected);
    t.end()
    });"""
}
