from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from tests.helpers import *
from tests.tape_tests import *


class GetCandidateCodeView(GenericAPIView):

    def post(self, request):
        num = request.data['question_id']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        candidate_id = request.data['candidate_id']

        data = read_the_candidate_code(num, candidate_id, first_name, last_name);
        return Response(data=data)


class RunTestOne(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_one_tapes["one"]
    tape_two = question_one_tapes["two"]
    tape_three = question_one_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 1

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestTwo(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_two_tapes["one"]
    tape_two = question_two_tapes["two"]
    tape_three = question_two_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 2

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestThree(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_three_tapes["one"]
    tape_two = question_three_tapes["two"]
    tape_three = question_three_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 3

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestFour(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_four_tapes["one"]
    tape_two = question_four_tapes["two"]
    tape_three = question_four_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 4

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestFive(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_five_tapes["one"]
    tape_two = question_five_tapes["two"]
    tape_three = question_five_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 5

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestSix(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_six_tapes["one"]
    tape_two = question_six_tapes["two"]
    tape_three = question_six_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 6

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestSeven(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_seven_tapes["one"]
    tape_two = question_seven_tapes["two"]
    tape_three = question_seven_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 7

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestEight(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_eight_tapes["one"]
    tape_two = question_eight_tapes["two"]
    tape_three = question_eight_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 8

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestNine(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_nine_tapes["one"]
    tape_two = question_nine_tapes["two"]
    tape_three = question_nine_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 9

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)


class RunTestTen(GenericAPIView):
    permission_classes = [IsAuthenticated]
    tape_one = question_ten_tapes["one"]
    tape_two = question_ten_tapes["two"]
    tape_three = question_ten_tapes["three"]

    def post(self, request):
        code_to_test = request.data['code']
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        user_id = request.data['user_id']
        num = 10

        make_directory(num, user_id, first_name, last_name)
        f = open_test_file(num, user_id, first_name, last_name)
        write_test_file(f, code_to_test, self.tape_one, self.tape_two, self.tape_three)
        f.close()
        run_the_test_code(num, user_id, first_name, last_name)
        data = read_the_test_result(num, user_id, first_name, last_name)
        return Response(data=data)
