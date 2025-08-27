from django.contrib import admin
from django.urls import path
from .views import Create_tweet,Get_tweet,Register_View,Login_view,SendFriendRequestView,RespondFriendRequestView,FriendsListView,UsersListView,PendingFriendRequestsView

urlpatterns = [
path('create/tweet/',Create_tweet,name='create_tweet'),
path('get/tweet/',Get_tweet,name='Get_tweet'),
path('auth/register/', Register_View.as_view(), name='Register_user'),
path('auth/login/', Login_view.as_view(), name='Register_user'),
path('send/Request', SendFriendRequestView.as_view(), name='Send_Friend_Request'),
path('respond/request/<int:pk>/', RespondFriendRequestView.as_view(), name='Respond_Friend_Request'),
path('friend/list/', FriendsListView.as_view(), name='Friends_List'),
path('friend/requests/', PendingFriendRequestsView.as_view(), name='Pending_Friend_Requests'),
path('user/list/', UsersListView.as_view(), name='Users_List'),
]