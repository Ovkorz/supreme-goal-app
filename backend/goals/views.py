from django.shortcuts import render
from rest_framework import mixins, permissions, generics, viewsets, status
from rest_framework.response import Response


from django.contrib.auth.models import User
from goals.models import Goal

from goals.permissions import IsOwnerOrReadOnly
from goals.serializers import UserSerializer, GoalSerializer

class userViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class goalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
        ]

    def list(self, request):
        goals = self.get_queryset().filter(created_by=self.request.user)
        serializer = GoalSerializer(goals, many=True)
        return Response(serializer.data)

        # notifications = self.get_queryset().filter(related_to=self.request.user)
        # serializer = NotificationSerializer(notifications, many=True)
        # return Response(serializer.data)

    def perform_create(self, serializer):
        # here you will send `created_by` in the `validated_data` 
        serializer.save(created_by=self.request.user)

    # def partial_update(self, request, pk=None):
        
    # def destroy(self, request, pk=None):

