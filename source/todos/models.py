from django.db import models
import datetime


class Todo(models.Model):
    title = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=1000, null=False)
    complete = models.BooleanField(default=False, null=False)
    created_date = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.title
