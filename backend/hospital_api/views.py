from rest_framework import generics
from .models import HospitalBasic, HospitalDetail
from .serializers import HospitalBasicSerializer, HospitalDetailSerializer

class HospitalList(generics.ListAPIView):
    queryset = HospitalBasic.objects.all()
    serializer_class = HospitalBasicSerializer
    
class HospitalDetail(generics.ListAPIView):
    queryset = HospitalDetail.objects.all()
    serializer_class = HospitalDetailSerializer