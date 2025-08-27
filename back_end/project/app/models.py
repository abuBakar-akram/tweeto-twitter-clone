from django.db import models
from django.contrib.auth.models import User
from django.db.models import Q


# Create your models here.
class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=300)
    photo=models.ImageField(upload_to='photos/',blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user.username)
    

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name="sent_requests", on_delete=models.CASCADE)
    to_user   = models.ForeignKey(User, related_name="received_requests", on_delete=models.CASCADE)
    status    = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("accepted", "Accepted"), ("rejected", "Rejected")],
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("from_user", "to_user")

    def __str__(self):
        return f"{self.from_user.username} → {self.to_user.username} ({self.status})"

def are_friends(user1, user2):
    return FriendRequest.objects.filter(
        (
            Q(from_user=user1, to_user=user2) |
            Q(from_user=user2, to_user=user1)
        ),
        status="accepted"
    ).exists()