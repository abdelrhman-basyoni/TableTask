from rest_framework import serializers
from .models import DataTable

class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataTable
        fields = ['numbers']