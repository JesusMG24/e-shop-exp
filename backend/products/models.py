from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    title = models.CharField(max_length=64)
    price = models.IntegerField(default=9999)
    image = models.ImageField(upload_to="products/", default="products/default.png", null=False, blank=False)
    description = models.CharField(max_length=1028, default="No description")
    published_at = models.DateTimeField(auto_now_add=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="products", blank=True)

    def __str__(self):
        return self.title

class Component(models.Model):
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100, blank=True, null=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    source_url = models.URLField(blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.price}"

