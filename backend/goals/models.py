from django.db import models

from django.contrib.auth.models import User


# Create your models here.

class Goal(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False,)
    description = models.CharField(max_length=300, blank=True, null=True),
    target = models.PositiveIntegerField(null=False, blank=False, default=1)
    amount_done = models.PositiveIntegerField()

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    # status = models.CharField(max_length=100, choices=STATUS_CHOICES, blank=False, null=False, default='auction_status_started')
    # 