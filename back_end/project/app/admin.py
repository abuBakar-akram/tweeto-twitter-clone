from django.contrib import admin
from .models import Tweet,FriendRequest
# Register your models here.


admin.site.register(Tweet)
admin.site.register(FriendRequest)