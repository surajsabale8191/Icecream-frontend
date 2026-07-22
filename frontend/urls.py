from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path("register/", views.register, name="register"),
    path("login/", views.login, name="login"),
    path("profile/", views.profile, name="profile"),
    path("change-password/", views.change_password, name="change_password"),
    path("products/", views.products, name="products"),
    path("cart/", views.cart, name="cart"),
    path("orders/", views.orders, name="orders"),
    path(
    "orders/<int:order_id>/",
    views.order_detail,
    name="order_detail"
),

]