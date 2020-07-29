import os
import json
from subprocess import Popen, PIPE


# ----- Functions used by all Tests run in tests/views.py to execute Tape tests ----

# Looks for and creates if necessary a directory with the candidates id, first, and last name
# num word must be the word representation of the question number being tested against
def make_directory(num_word, user_id, first_name, last_name):
    candidate_directory = os.path.join(f'tests/question_{num_word}/user_{user_id}_{first_name}_{last_name}')
    if not os.path.exists(candidate_directory):
        os.mkdir(candidate_directory)


# Creates a file in the directory from the previous function to store candidates code to test
# num word must be the word representation of the question number being tested against
def open_test_file(num_word, user_id, first_name, last_name):
    return open(f'tests/question_{num_word}/user_{user_id}_{first_name}_{last_name}/question_{num_word}_tester.test.js',
                'w')


# Writes in the created file all information necessary to run a predetermined tape test on candidates written code
# tape_"some_number" are the written js tape tests stored inside tests/tape_tests.py, file is the file created by
# open_test_file()
def write_test_file(file, code_to_test, tape_one, tape_two, tape_three):
    file.write(f"""const test = require('tape');

{code_to_test}

{tape_one}

{tape_two}

{tape_three}""")


# Runs the npm script in backend/package.json, $RESULT and $TEST are used here to pass locations of the test / results
# num word must be the word representation of the question number being tested against
def run_the_test_code(num_word, user_id, first_name, last_name):
    result = f'tests/question_{num_word}/user_{user_id}_{first_name}_{last_name}/question_{num_word}_test_results.json'
    test = f'tests/question_{num_word}/user_{user_id}_{first_name}_{last_name}/question_{num_word}_tester.test.js'
    command = f'RESULT={result} TEST={test} npm run test'
    process = Popen(command, shell=True, stdout=PIPE)
    process.wait()


# Reads the results of the Tape test piped through Tap Json and output to the file in candidates directory
# num word must be the word representation of the question number being tested against
def read_the_test_result(num_word, user_id, first_name, last_name):
    with open(
            f'tests/question_{num_word}/user_{user_id}_{first_name}_{last_name}/question_{num_word}_test_results.json') as f:
        return json.loads(f.read())
