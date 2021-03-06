from django.shortcuts import render
from django.http import JsonResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

from django.core import serializers

from lists.models import Groceries

from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from django.utils.encoding import force_text
from rest_framework import status

from django.utils.six import BytesIO
from rest_framework.parsers import JSONParser


class CurrentGroceriesViewSet(APIView):
    queryset = Groceries.objects.all()
    
    def get(self, request, format=None):
        groceries = Groceries.objects.all()
        serializer = GroceriesSerializer(groceries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GroceriesSerializer(data=request.data)
        if serializer.is_valid():
            add_item = request.data['name']
            quantity = request.data['quantity']
            if add_item and quantity:
                Groceries.objects.create(name=add_item, quantity=quantity)
                return HttpResponse(status=201)
        else:
            print(serializer.errors)
            return HttpResponse(status=400)
        #drf should have a valid - check documentation

        if not isinstance( quantity, int ):
            raise ValidationError('Invalid integer','quantity',status_code=status.HTTP_400_BAD_REQUEST)

        elif (quantity <= 0):
            raise ValidationError('Must be positive', 'quantity', status_code=status.HTTP_400_BAD_REQUEST)
        elif not isinstance( add_item, str ):
            raise ValidationError('Invalid grocery item', 'add_item', status_code=status.HTTP_400_BAD_REQUEST)
    
class ValidationError(APIException):
    status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    default_detail = 'A server error occurred.'

    def __init__(self, detail, field, status_code):
        if status_code is not None:self.status_code = status_code
        if detail is not None:
            self.detail = {field: force_text(detail)}
        else: self.detail = {'detail': force_text(self.default_detail)}