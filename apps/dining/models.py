from django.db import models
from ckeditor.fields import RichTextField
from authentication.models import Account
from datetime import datetime
# Create your models here.

class Menu(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = RichTextField(null=True, blank=True)
    price = models.FloatField(default=0.0,null=True, blank=True)
    priority = models.IntegerField(default=1,null=True, blank=True)

    class Meta:
        ordering = ['priority']
        verbose_name_plural = "Menu"
    
    def __str__(self):
        return self.name

class Dining(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    # date.editable = True
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, blank=True, null=True)
    dining_status = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Dining"

    def __str__(self):
        return ' '.join([self.user.first_name, self.user.last_name])

class FreeMeal(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    date = models.DateField(blank=False, null=False)
    meal = models.ForeignKey(Menu, on_delete=models.CASCADE, blank=True, null=True)
    requested_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Free Meal"

    def __str__(self):
        return ' '.join([self.user.first_name, self.user.last_name])