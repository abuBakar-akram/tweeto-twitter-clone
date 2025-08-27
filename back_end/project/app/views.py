from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import status, generics,permissions
from .models import Tweet,FriendRequest,are_friends
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import Tweet_serializer,Register_serializer,FriendshipSerializer,PublicUserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from django.db.models import Q



# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def Create_tweet(request):
    data=request.data
    serializer=Tweet_serializer(data=data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data , status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def Get_tweet(request):
    user = request.user
    all_tweets = Tweet.objects.all()
    visible_tweets = []
    for tweet in all_tweets:
        if tweet.user == user or are_friends(user, tweet.user):
            visible_tweets.append(tweet)
    if not visible_tweets:
        return Response([])

    serializer = Tweet_serializer(visible_tweets, many=True)
    return Response(serializer.data)

# class Register_View(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny] 
#     serializer_class = Register_serializer


class Register_View(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        data=request.data
        serializer=Register_serializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message' : 'user cretaed Successfully', 'status':True}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


# class Login_view(generics.CreateAPIView):
#     serializer_class=Login_serializer
#     def post(self, request, *args, **kwargs):
#         username=request.data.get('username')
#         password=request.data.get('password')
#         user = authenticate(username=username,password=password)
#         if user is not None:
#             refresh=RefreshToken.for_user(user)
#             user_serializer = User_serializer(user)
#             return Response(
#                 {
#                     'refresh':str(refresh),
#                     'access':str(refresh.access_token),
#                     'user' : user_serializer.data
#                 }
#             )
#         else:
#             return Response(
#                 {
#                     'detail':'Invalid credentui'
#                 }, status=401
#             )

class Login_view(APIView):
    def post(self,request):
        data=request.data
        username=data.get('username')
        password=data.get('password')
        user=User.objects.filter(username=username).first()
        if user and user.check_password(password):
            refresh=RefreshToken.for_user(user)
            return Response(
                {
                    'access_token':str(refresh.access_token),\
                    'refresh_token':str(refresh)
                }
            )
        return Response({'message': 'invalid credentials'},status=status.HTTP_400_BAD_REQUEST)


class Profile_view(APIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        user = request.user
        serializer=Register_serializer(user)
        return Response(serializer.data)

        
#at here generic built in class is being used which will take care of all things like taking data , saving to serializer , if serializer valid , if not all of these things only you need to apply logic what this class will do when saving serializer 
class SendFriendRequestView(generics.CreateAPIView):
    serializer_class = FriendshipSerializer
    #this means only loged in user can send req
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)


class RespondFriendRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            friendship = FriendRequest.objects.get(id=pk, to_user=request.user)
        except FriendRequest.DoesNotExist:
            return Response({"error": "Request not found"}, status=status.HTTP_404_NOT_FOUND)

        action = request.data.get("action")  # 'accept' or 'reject'

        if action == "accept":
            friendship.status = "accepted"
            friendship.save()
            return Response({"message": "Friend request accepted"})

        elif action == "reject":
            friendship.status = "rejected"
            friendship.save()
            return Response({"message": "Friend request rejected"})

        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)


class FriendsListView(generics.ListAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FriendRequest.objects.filter(
            status="accepted"
        ).filter(
            Q(from_user=self.request.user) | Q(to_user=self.request.user)
        )
    

class PendingFriendRequestsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FriendshipSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(status="pending", to_user=self.request.user)


class UsersListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PublicUserSerializer

    def get_queryset(self):
        user = self.request.user
        return User.objects.exclude(id=user.id).order_by('username')