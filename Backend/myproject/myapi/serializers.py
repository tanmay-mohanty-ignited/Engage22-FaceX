from rest_framework import serializers
from myapi.models import *
from django.contrib.auth.models import User

# Serializers for all the models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','first_name','email')


class CriminalSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required = False)
    
    class Meta:
        model = Criminals
        fields = ('id', 'name', 'image_url', 'crimes', 'current_status', 'encoding')


class CriminalImgDetectSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required = False)
    query_image_url = serializers.ImageField(required = False)
    
    class Meta:
        model = CriminalImgDetect
        fields = ('name', 'query_image_url', 'image_url', 'crimes', 'current_status', 'encoding')


class CriminalVideoDetectSerializer(serializers.ModelSerializer):
    query_video_url = serializers.FileField(required = False)
    
    class Meta:
        model = CriminalVideoDetect
        fields = ('query_video_url', 'name')


class AppUsersSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField(required = False)
    
    class Meta:
        model = AppUsers
        fields = ('id', 'name', 'department', 'image_url', 'last_video_url', 'last_image_url')

