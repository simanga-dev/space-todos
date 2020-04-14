from django.db import models


class Member(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    password = models.CharField(max_length=200)
    age = models.IntegerField()

    def __str__(self):
        return self.first_name + ' ' + self.last_name
