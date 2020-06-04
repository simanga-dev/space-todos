from django.db import models
import datetime


class Todo(models.Model):
    title = models.CharField(max_length=30, null=False)
    description = models.CharField(max_length=1000, null=False)
    isComplete = models.BooleanField(default=False, null=False)
    date_created = models.DateField(default=datetime.date.today)
    time_created = models.TimeField(default=datetime.datetime.now)

    def __str__(self):
        return self.title
