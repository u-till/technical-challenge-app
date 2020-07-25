from rest_framework import serializers
from tip.models import Tip


class TipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tip
        fields = ['id', 'content', 'discount_value', 'created', 'updated', 'question']
