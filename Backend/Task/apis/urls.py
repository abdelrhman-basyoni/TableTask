from django.urls import path
from .views import TableData
urlpatterns = [
  
 

    path('table/', TableData.as_view() ,name='tabledata'),
]