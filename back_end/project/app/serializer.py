from rest_framework import serializers
from .models import Tweet,FriendRequest
from django.contrib.auth.models import User

class Tweet_serializer(serializers.ModelSerializer):
    class Meta:
        model=Tweet
        fields='__all__'
        read_only_fields = ['user']


class User_serializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('username','password')
        

class Register_serializer(serializers.ModelSerializer):
    password2=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=('username','password','password2')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 6},
            'password2': {'write_only': True, 'min_length': 6},
            'username': {'required': True},
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Password must match")
        return data   

    def create(self, validated_data):
        validated_data.pop('password2', None)
        username = validated_data.get('username')
        password = validated_data.get('password')
        user = User.objects.create_user(
            username=username,
            password=password,
        )
        return user
    

class FriendshipSerializer(serializers.ModelSerializer):
    to_user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True)
    from_user_username = serializers.CharField(source='from_user.username', read_only=True)
    to_user_username = serializers.CharField(source='to_user.username', read_only=True)

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user_username', 'to_user_username', 'to_user', 'status']
        read_only_fields = ['id', 'from_user_username', 'to_user_username', 'status']


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']