from django.urls import path, include

from goals.views import goalViewSet, userViewSet
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('', goalViewSet.as_view({'get': 'list'})),
    path('<int:pk>', goalViewSet.as_view({'get':'retrieve'})),
    path('users', userViewSet.as_view({'get':'list', 'post':'create'})),
]

urlpatterns = format_suffix_patterns(urlpatterns)