from rest_framework import serializers
from .models import HospitalBasic, HospitalDetail, HospitalRealTime

class HospitalBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalBasic
        fields = '__all__'
        
class HospitalDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalDetail
        fields = '__all__'
        
class HospitalRealTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = HospitalRealTime
        fields = '__all__'