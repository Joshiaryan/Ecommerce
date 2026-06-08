from rest_framework import serializers
from .models import product, category,
 class categorySerializer(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = '__all__'
        class productSerializer(serializers.ModelSerializer):
             categorySerializer():
                class Meta: 
                model = product
                fields = '__all__'