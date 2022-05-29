from django.urls import path
from .views import *
from rest_framework.authtoken.views import obtain_auth_token 


# Here we defined all the paths to access our functionalities
urlpatterns = [
    path('criminals/', CriminalViewSet.as_view()),
    path('criminals/<uuid:id>', CriminalViewSet.as_view()),
    path('criminal-image-detection/', CriminalImgDetectViews.as_view()),
    path('criminal-video-detection/', CriminalVideoDetectViews.as_view()),
    path('register/', Register.as_view()),
    path('app-user/', AppUserView.as_view()),
]
