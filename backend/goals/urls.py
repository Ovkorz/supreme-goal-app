from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

from goals.views import goalViewSet, goalDetail, userViewSet, greetView

urlpatterns = [
    path('', goalViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('<int:pk>/', goalDetail.as_view()),
    path('users/', userViewSet.as_view({'get':'list', 'post':'create'})),
]

urlpatterns = format_suffix_patterns(urlpatterns)