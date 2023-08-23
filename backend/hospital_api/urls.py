from django.urls import path
from .views import *

urlpatterns = [
    path('hospitals/', HospitalList.as_view()),
    path('hospital_details/', HospitalDetailView.as_view()),
    path('hospital_realtime/', HospitalRealTimeView.as_view()),
]