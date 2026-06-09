from django.urls import path
from .views import api_overview, get_product_list, get_category_list

urlpatterns = [
    path('', api_overview, name='api-overview'),
    path('products/', get_product_list, name='product-list'),
    path('categories/', get_category_list, name='category-list'),
]