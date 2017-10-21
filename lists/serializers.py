from rest_framework import serializers

from .models import *

class GroceriesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Groceries
    fields = ('name', 'quantity', 'id')