from django.shortcuts import render
from rest_framework import authentication, permissions, viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from dining.serializers import UserPointsSerializer, MenuSerializer, DiningSerializer, FreeMealSerializer
from authentication.models import UserPoints
from dining.models import Menu, Dining, FreeMeal

from datetime import date
from datetime import datetime
# Create your views here.

class fetchPoints(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        users = UserPoints.objects.get(user=request.user)
        serializer = UserPointsSerializer(users)
        return Response(serializer.data)

class fetchMenu(APIView):
    def get(self, request):
        menu = Menu.objects.all()
        serializer = MenuSerializer(menu, many=True)
        return Response(serializer.data)

class todaysDiningStatus(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        today = date.today()
        dining = Dining.objects.filter(user=request.user, date__date=today)
        serializer = DiningSerializer(dining, many=True)
        return Response(serializer.data)

class addDining(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        earned_points = 0

        dining_status = request.data.get('dining_status', None)
        menu = request.data.get('menu', None)

        if (menu is None or menu == "") and dining_status:
            return Response({
                'status': 'Unauthorized',
                'message': 'Meal selection required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if dining_status is None or dining_status == "":
            return Response({
                'status': 'Unauthorized',
                'message': 'Dining Status required!'
            }, status=status.HTTP_401_UNAUTHORIZED)
        if dining_status:
            get_menu = Menu.objects.get(id=menu)
            add_dining = Dining.objects.create(user=request.user, menu=get_menu, dining_status=dining_status)
        else:
            add_dining = Dining.objects.create(user=request.user, dining_status=dining_status)
        serialized = DiningSerializer(add_dining)

        if dining_status:
            condition_one = '08:00:00'
            condition_one = datetime.strptime(condition_one, '%H:%M:%S')
            condition_two = '10:00:00'
            condition_two = datetime.strptime(condition_two, '%H:%M:%S')
            if add_dining.date.time() < condition_one.time():
                earned_points = 25
            elif add_dining.date.time() < condition_two.time():
                earned_points = 15
        else:
            condition = '10:00:00'
            condition = datetime.strptime(condition, '%H:%M:%S')
            if add_dining.date.time() < condition.time():
                earned_points = 10
            else:
                earned_points = 0

        user_points = UserPoints.objects.get(user=request.user)
        user_points.points = user_points.points + earned_points
        user_points.save()
        data = {
            "earned_points": earned_points,
            "dining_status": add_dining.dining_status
        }
        if serialized.data:
            return Response({
                'status': "Success",
                'message': "Successfully Added Meal!",
                'data': data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'status': "Unauthorized",
                'message': "Please Try agin later!",
                'data': data
            }, status=status.HTTP_401_UNAUTHORIZED)

class FreeMealAtDining(APIView):
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        meal_date = request.data.get('date', None)
        meal = request.data.get('selected_meal', None)

        if meal_date is None or meal_date == "":
            return Response({
                'status': 'Unauthorized',
                'message': 'Meal Date is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if meal is None or meal == "":
            return Response({
                'status': 'Unauthorized',
                'message': 'Meal is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        get_menu = Menu.objects.get(id=meal)
        date = datetime.strptime(meal_date, "%Y-%m-%d").date()

        user = UserPoints.objects.get(user=request.user)
        if user.points < 500:
            return Response({
                'status': 'Unauthorized',
                'message': 'User have not enough points!'
            }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            free_meal = FreeMeal.objects.create(user=request.user, date=date, meal=get_menu)
            if free_meal:
                user.points = user.points - 500
                user.save()
            serialized = FreeMealSerializer(free_meal)
            return Response(serialized.data)
