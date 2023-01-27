from django.shortcuts import render
from django.http import JsonResponse


from rest_framework import mixins, permissions, generics, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action




from django.contrib.auth.models import User
from goals.models import Goal

from goals.permissions import IsOwnerOrReadOnly, AllowAnonCreateUser
from goals.serializers import UserSerializer, GoalSerializer

class userViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAnonCreateUser]


class goalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [
        # permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
        ]

    def list(self, request):
        goals = self.get_queryset().filter(created_by=self.request.user)
        serializer = GoalSerializer(goals, many=True)
        return JsonResponse(serializer.data, safe=False)

        # notifications = self.get_queryset().filter(related_to=self.request.user)
        # serializer = NotificationSerializer(notifications, many=True)
        # return Response(serializer.data)

    def perform_create(self, serializer):
        # here you will send `created_by` in the `validated_data` 
        serializer.save(created_by=self.request.user)



class goalDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView,):

    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwnerOrReadOnly,
        ]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    # def partial_update(self, request, *args, **kwargs):
    #     kwargs['partial'] = True
    #     return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

# class goalPatch(mixins.UpdateModelMixin,
#                 generics.GenericAPIView):

#     ueryset = Goal.objects.all()
#     serializer_class = GoalSerializer
#     permission_classes = [
#         permissions.IsAuthenticated,
#         ]


#     def update(self, request, *args, **kwargs):
#         kwargs['partial'] = True
#         return super().update(request, *args, **kwargs)


class greetView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        resp = {
            'message': "hello!"
        }

        return JsonResponse(resp)