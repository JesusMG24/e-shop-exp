from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Product, Component

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ("seller",)

class ComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Component
        fields = "__all__"
        