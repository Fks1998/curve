from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import permissions, viewsets, status, views, parsers, renderers
from rest_framework.response import Response
from authentication.models import Account, UserDetails, UserPoints

from authentication.serializers import AccountSerializer

class LoginView(views.APIView):
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request, format=None):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

class RegisterView(views.APIView):
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)

    def post(self, request, format=None):
        first_name = request.data.get('first_name', None)
        last_name = request.data.get('last_name', None)
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        confirm_password = request.data.get('confirm_password', None)
        selected_dietary = request.data.get('selected_dietary', None)
        user_type = request.data.get('user_type', None)

        if first_name is None:
            return Response({
                'status': 'Unauthorized',
                'message': 'FirstName is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if last_name is None:
            return Response({
                'status': 'Unauthorized',
                'message': 'LastName is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if email is None:
            return Response({
                'status': 'Unauthorized',
                'message': 'Email is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if password is None:
            return Response({
                'status': 'Unauthorized',
                'message': 'Password is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if confirm_password is None:
            return Response({
                'status': 'Unauthorized',
                'message': 'Confirm Password is required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if confirm_password != password:
            return Response({
                'status': 'Unauthorized',
                'message': 'Password and Confirm Password is not matched!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        if user_type == 'student':
            course_name = request.data.get('course_name', None)
            selected_year = request.data.get('selected_year', None)

            if course_name is None:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'Course Name is Required!'
                }, status=status.HTTP_401_UNAUTHORIZED)

            if selected_year is None:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'Year is Required!'
                }, status=status.HTTP_401_UNAUTHORIZED)

        if selected_dietary is None:
            return Response({
                'status': 'Unauthorized',
                'message': 'Selected Dietary is Required!'
            }, status=status.HTTP_401_UNAUTHORIZED)

        user_exist = Account.objects.filter(email=email)
        dietary_requirements = ",".join([dietary['value'] for dietary in selected_dietary])

        if user_exist:
            return Response({
                'status': 'Unauthorized',
                'message': 'User Already Exist With this Email!.'
            }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            user = Account.objects.create(email=email, username=email, first_name=first_name, last_name=last_name)
            user.set_password(password)
            user.save()
            if user_type == 'student':
                user_details = UserDetails.objects.create(user=user, course_name=course_name, year=selected_year, dietary_requirements=dietary_requirements, user_type=user_type)
            else:
                j = UserDetails.objects.create(user=user, dietary_requirements=dietary_requirements, user_type=user_type)
            user_points = UserPoints.objects.create(user=user, points=50)
            serialized = AccountSerializer(user)
            return Response(serialized.data)
        return Response({
            'status': 'Unauthorized',
            'message': 'Please Try Agin Later!'
        }, status=status.HTTP_401_UNAUTHORIZED)
