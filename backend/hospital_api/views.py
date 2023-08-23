from rest_framework import generics
from .models import HospitalBasic, HospitalDetail, HospitalRealTime
from .serializers import HospitalBasicSerializer, HospitalDetailSerializer, HospitalRealTimeSerializer

class HospitalList(generics.ListAPIView):
    queryset = HospitalBasic.objects.all()
    serializer_class = HospitalBasicSerializer
    
class HospitalDetailView(generics.ListAPIView):
    queryset = HospitalDetail.objects.all()
    serializer_class = HospitalDetailSerializer
    
class HospitalRealTimeView(generics.ListAPIView):
    queryset = HospitalRealTime.objects.all()
    serializer_class = HospitalRealTimeSerializer