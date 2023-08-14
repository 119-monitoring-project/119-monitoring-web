from rest_framework import generics
from .models import HospitalBasic 
from .serializers import HospitalBasicSerializer

class HospitalList(generics.ListAPIView):
    queryset = HospitalBasic.objects.all()
    serializer_class = HospitalBasicSerializer