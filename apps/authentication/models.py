from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.utils.translation import gettext as _

# Models which will be used as objects in the program. for instance, there are four distinct models which will be used which are:
# - Account Manager: This is the managing user who is able to create new users and admins. This class acts as a helper to django's command line interface
# - Account: This is the account which is created as a result of the Account Manager
# - User Details: This is the class which details all of the user's attributes which will be manipulated during the running of the program
# - User Points:  This class is a representation of the points which are assigned to each user

class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(
            email=self.normalize_email(email), username=kwargs.get('username')
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_superuser = True
        account.is_staff = True
        account.save()

        return account

class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    tagline = models.CharField(max_length=140, blank=True)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __unicode__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

class UserDetails(models.Model):
    YEAR = (
        ('1', _('1st Year')),
        ('2', _('2nd Year')),
        ('3', _('3rd Year')),
    )
    USER_TYPE = (
        ('student', _('Student')),
        ('staff', _('Staff')),
    )
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    course_name = models.CharField(max_length=255, null=True, blank=True)
    year = models.CharField(max_length=128, choices=YEAR, null=True, blank=True)
    user_type = models.CharField(max_length=128, choices=USER_TYPE, null=True, blank=True)
    dietary_requirements = models.TextField(null=False, blank=False)

    class Meta:
        verbose_name_plural = "User Details"

    def __str__(self):
        return ' '.join([self.user.first_name, self.user.last_name])

class UserPoints(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    points = models.IntegerField(default=0,null=True, blank=True)

    class Meta:
        verbose_name_plural = "User Points"

    def __str__(self):
        return ' '.join([self.user.first_name, self.user.last_name])
