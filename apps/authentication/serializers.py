from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account, UserDetails
# Serializers allow complex data such as querysets and model instances to be
# converted to native Python datatypes that can then be easily rendered into JSON, XML or other content types

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserDetails
        fields = "__all__"

class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    full_name = serializers.SerializerMethodField(read_only=True)
    user_detail = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'tagline', 'password',
                  'confirm_password', 'full_name', 'user_detail')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        return Account.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.tagline = validated_data.get('tagline', instance.tagline)

        instance.save()

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

        update_session_auth_hash(self.context.get('request'), instance)

        return instance

    def get_full_name(self, obj):
        return "{} {}".format(obj.first_name, obj.last_name)

    def get_user_detail(self, obj):
        detail = UserDetails.objects.get(user=obj)
        serializer = UserDetailsSerializer(detail)
        return serializer.data
