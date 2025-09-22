from django.contrib.auth.models import User
from .models import Product, Component
from .serializers import ProductSerializer, ComponentSerializer
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializedData = ProductSerializer(products, many=True).data
    return Response(serializedData)

@api_view(['GET'])
def get_components(request):
    components = Component.objects.all()
    serializedData = ComponentSerializer(components, many=True).data
    return Response(serializedData)

class ComponentSearchView(generics.ListAPIView):
    serializer_class = ComponentSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        return Component.objects.filter(name__icontains=query)

class CreateProduct(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Product.objects.filter(seller=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(seller=self.request.user)
        else:
            print(serializer.errors)