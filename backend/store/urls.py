from django.urls import path
from .views import (
    get_products, get_product, get_categories,
    get_cart, add_to_cart, update_cart_quantity, remove_from_cart,
    create_order, register_view
)

urlpatterns = [
    path('products/', get_products, name='product-list'),
    path('products/<int:pk>/', get_product, name='product-detail'),
    path('categories/', get_categories, name='category-list'),
    path('cart/', get_cart, name='cart'),
    path('cart/add/', add_to_cart, name='add-to-cart'),
    path('cart/update/', update_cart_quantity, name='update-cart'),
    path('cart/remove/', remove_from_cart, name='remove-from-cart'),
    path('order/create/', create_order, name='create-order'),
    path('register/', register_view, name='register'),
]