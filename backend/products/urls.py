from django.urls import path
from .views import get_products, get_components, ComponentSearchView, CreateProduct
from . import views

urlpatterns = [
    path('products/', get_products, name='get_products'),
    path('components/', get_components, name='get_components'),
    path('components/search/', ComponentSearchView.as_view(), name='component-search'),
    path('products/create/', CreateProduct.as_view(), name='create_product'),
]