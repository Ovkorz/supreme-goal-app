from rest_framework import serializers, fields

from django.contrib.auth.models import User
from goals.models import Goal


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}


class GoalSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    # description = serializers.CharField(required=False, allow_null=True)
    target = serializers.IntegerField()
    amount_done = serializers.IntegerField()
    # created_by = serializers.IntegerField(allow_null=True)

    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(GoalSerializer, self).__init__(*args, **kwargs)


    class Meta:
        model = Goal
        fields = ['id', 'title', 'description', 'target', 'amount_done']