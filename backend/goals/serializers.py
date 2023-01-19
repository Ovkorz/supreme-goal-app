from rest_framework import serializers, fields

from django.contrib.auth.models import User
from goals.models import Goal


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = ['id', 'title', 'description', 'target', 'amount_done', 'created_by']