from django.db import models

# Create your models here.
class Groceries(models.Model):
    name = models.CharField(max_length=250)
    quantity = models.IntegerField()
    done = models.BooleanField(default=False)

    class Meta:
        ordering = ['name']