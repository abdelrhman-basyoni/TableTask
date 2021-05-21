from django.shortcuts import render
from rest_framework.views import APIView
from .models import DataTable
from rest_framework.response import Response
from rest_framework import permissions

from .serializers import TableSerializer
# Create your views here.
class TableData(APIView):
    permission_classes = [permissions.AllowAny]


    def get(self,request):
        numbers = DataTable.objects.all()
        numbers_list = []
        for number in numbers:
            serializer = TableSerializer(number)
            numbers_list.append(serializer.data)
        return Response({
            'status':1,
            'message':'success',
            'data':numbers_list,
        })