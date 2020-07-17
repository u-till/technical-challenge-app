from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
import os
import time
import json


class RunTestOne(GenericAPIView):
    tape_one = """test('function should return the sum of two numbers', function(t) {
    const result = sum(1,2); 
    const expected = 3;
    t.deepEqual(result, expected);
    t.end();
    });"""

    tape_two = """test('function should return the sum of two numbers', function(t) {
     const result = sum(4,10);
     const expected = 14;
     t.deepEqual(result, expected);
     t.end();
     });"""

    tape_three = """test('function should return the sum of two numbers', function(t) {
     const result = sum(10,-1);
     const expected = 9;
     t.deepEqual(result, expected);
     t.end();
     });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_one/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_one/{username}/question_one_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_one/{username}/question_one_test_results.json TEST=tests/question_one/{username}/question_one_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_one/{username}/question_one_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestTwo(GenericAPIView):
    tape_one = """test('should reverse the contents of a string', function(t) {
    const result = reverseString('TestString');
    const expected = 'gnirtStseT';
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_two = """test('should reverse the contents of a string', function(t) {
    const result = reverseString('Propulsion_Academy');
    const expected = 'ymedacA_noisluporP';
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_three = """test('should reverse the contents of a string', function(t) {
    const result = reverseString('HelloWorld!');
    const expected = '!dlroWolleH';
    t.deepEqual(result, expected);
    t.end()
    });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_two/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_two/{username}/question_two_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_two/{username}/question_two_test_results.json TEST=tests/question_two/{username}/question_two_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_two/{username}/question_two_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestThree(GenericAPIView):
    tape_one = """test('should return the first element of an array', function(t) {
    const result = firstElement([1, 2, 3]);
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_two = """test('should return the first element of an array', function(t) {
    const result = firstElement([80, 5, 100]);
    const expected = 80;
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_three = """test('should return the first element of an array', function(t) {
    const result = firstElement([-500, 0, 50]);
    const expected = -500;
    t.deepEqual(result, expected);
    t.end()
    });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_three/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_three/{username}/question_three_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_three/{username}/question_three_test_results.json TEST=tests/question_three/{username}/question_three_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_three/{username}/question_three_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestFour(GenericAPIView):
    tape_one = """test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(100);
    const expected = false;
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_two = """test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(0);
    const expected = true;
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_three = """test('should return the boolean value of a number being less than or equal to zero', function(t) {
    const result = lessThanOrEqualToZero(-21);
    const expected = true;
    t.deepEqual(result, expected);
    t.end()
    });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_four/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_four/{username}/question_four_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_four/{username}/question_four_test_results.json TEST=tests/question_four/{username}/question_four_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_four/{username}/question_four_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestFive(GenericAPIView):
    tape_one = """test('should return the next number from the integer passed', function(t) {
    const result = addition(0);
    const expected = 1;
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_two = """test('should return the next number from the integer passed', function(t) {
    const result = addition(9);
    const expected = 10;
    t.deepEqual(result, expected);
    t.end()
    });"""

    tape_three = """test('should return the next number from the integer passed', function(t) {
    const result = addition(-3);
    const expected = -2;
    t.deepEqual(result, expected);
    t.end()
    });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_five/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_five/{username}/question_five_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_five/{username}/question_five_test_results.json TEST=tests/question_five/{username}/question_five_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_five/{username}/question_five_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestSix(GenericAPIView):
    tape_one = """test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
                const result = addUp(4);
                const expected = 10;
                t.deepEqual(result, expected);
                t.end()
                });"""

    tape_two = """test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
                const result = addUp(1);
                const expected = 1;
                t.deepEqual(result, expected);
                t.end()
                });"""

    tape_three = """test('returns the sum of all the numbers from 1 to the number passed as an argument', function(t) {
                const result = addUp(600);
                const expected = 180300;
                t.deepEqual(result, expected);
                t.end()
                });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_six/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_six/{username}/question_six_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_six/{username}/question_six_test_results.json TEST=tests/question_six/{username}/question_six_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_six/{username}/question_six_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestSeven(GenericAPIView):
    tape_one = """test('returns the number of vowels ( a, e, i, o, u ) contained within it', function(t) {
            const result = countVowels("Celebration");
            const expected = 5;
            t.deepEqual(result, expected);
            t.end()
            });"""

    tape_two = """test('returns the number of vowels ( a, e, i, o, u ) contained within it', function(t) {
            const result = countVowels("Palm");
            const expected = 1;
            t.deepEqual(result, expected);
            t.end()
            });"""

    tape_three = """test('returns the number of vowels ( a, e, i, o, u ) contained within it', function(t) {
            const result = countVowels("Prediction");
            const expected = 4;
            t.deepEqual(result, expected);
            t.end()
            });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_seven/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_seven/{username}/question_seven_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_seven/{username}/question_seven_test_results.json TEST=tests/question_seven/{username}/question_seven_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_seven/{username}/question_seven_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestEight(GenericAPIView):
    tape_one = """test('should return both the minimum and maximum numbers, in an array, in that order', function(t) {
            const result = minMax([1, 2, 3, 4, 5]);
            const expected = [1, 5];
            t.deepEqual(result, expected);
            t.end()
            });"""

    tape_two = """test('should return both the minimum and maximum numbers, in an array, in that order', function(t) {
            const result = minMax([2334454, 5]);
            const expected = [5, 2334454];
            t.deepEqual(result, expected);
            t.end()
            });"""

    tape_three = """test('should return both the minimum and maximum numbers, in an array, in that order', function(t) {
            const result = minMax([1]);
            const expected = [1, 1];
            t.deepEqual(result, expected);
            t.end()
            });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_eight/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_eight/{username}/question_eight_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_eight/{username}/question_eight_test_results.json TEST=tests/question_eight/{username}/question_eight_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_eight/{username}/question_eight_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestNine(GenericAPIView):
    tape_one = """test('should return the number of times the first string (single character) appears in the second string', function(t) {
            const result = charCount('a', 'edabit');
            const expected = 1;
            t.deepEqual(result, expected);
            t.end()
            });"""

    tape_two = """test('should return the number of times the first string (single character) appears in the second string', function(t) {
            const result = charCount('c', 'Chamber of secrets');
            const expected = 1;
            t.deepEqual(result, expected);
            t.end()
            });"""

    tape_three = """test('should return the number of times the first string (single character) appears in the second string', function(t) {
            const result = charCount('7', '10795426697');
            const expected = 2;
            t.deepEqual(result, expected);
            t.end()
            });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_nine/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_nine/{username}/question_nine_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_nine/{username}/question_nine_test_results.json TEST=tests/question_nine/{username}/question_nine_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_nine/{username}/question_nine_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)


class RunTestTen(GenericAPIView):
    tape_one = """test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
        const result = multiplyAll([[1],[2],[3]]);
        const expected = 6;
        t.deepEqual(result, expected);
        t.end()
        });"""

    tape_two = """test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
        const result = multiplyAll([[1,2],[3,4],[5,6,7]]);
        const expected = 5040;
        t.deepEqual(result, expected);
        t.end()
        });"""

    tape_three = """test('should return the value of multiplying all numbers from the array of arrays passed', function(t) {
        const result = multiplyAll([[5,1],[0.2, 4, 0.5],[3, 9]]);
        const expected = 54;
        t.deepEqual(result, expected);
        t.end()
        });"""

    def post(self, request):
        code_to_test = request.data['code']
        username = request.data['username']

        candidate_directory = os.path.join(f'tests/question_ten/{username}')
        if not os.path.exists(candidate_directory):
            os.mkdir(candidate_directory)

        f = open(f'tests/question_ten/{username}/question_ten_tester.test.js', 'w')
        f.write(f"""const test = require('tape');

{code_to_test}

{self.tape_one}

{self.tape_two}

{self.tape_three}""")

        f.close()

        os.popen(
            f'RESULT=tests/question_ten/{username}/question_ten_test_results.json TEST=tests/question_ten/{username}/question_ten_tester.test.js npm run test')

        time.sleep(3)

        with open(f'tests/question_ten/{username}/question_ten_test_results.json') as f:
            data = json.loads(f.read())

        return Response(data=data)
