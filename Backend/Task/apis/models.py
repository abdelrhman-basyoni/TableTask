from django.db import models

# Create your models here.
class DataTable(models.Model):
    numbers = models.IntegerField()

    def __str__(self):
        return f'{self.numbers}'