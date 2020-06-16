from django.contrib.auth.forms import UserCreationForm

from .models import User


class UserRegisterForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ('email', 'username',)
    # print('hello')
