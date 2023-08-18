from django.urls import path
from .views import *

urlpatterns = [
    path('hospitals/', HospitalList.as_view()),
    path('hospital_details/', HospitalDetail.as_view()),
]