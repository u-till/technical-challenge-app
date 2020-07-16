from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
import os


class RunTestOne(GenericAPIView):
    def post(self, request):
        code_to_test = request.data['code']

        f = open('code_to_test.js', 'w')
        f.write("module.exports = " + code_to_test)
        f.close()

        stream = os.popen('node code_to_test.js')
        output = stream.read()

        return Response(data=output)
