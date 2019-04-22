from rest_framework import serializers

from authentication.models import UserPoints
from dining.models import Menu, Dining, FreeMeal

class UserPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPoints
        fields = "__all__"

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = "__all__"

class DiningSerializer(serializers.ModelSerializer):
    menu = MenuSerializer()
    class Meta:
        model = Dining
        fields = "__all__"

class FreeMealSerializer(serializers.ModelSerializer):
    class Meta:
        model = FreeMeal
        fields = "__all__"