from rest_framework import serializers
from .models import Login, Staff, Receptionist, BookAppointment, Diagnosis, Medicine, LabTest
from .models import Department, Role

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        # fields = ['role', 'email', 'password']
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = Login.objects.create(**validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user



class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'






class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=25)



class RegisterStaffSerializer(serializers.ModelSerializer):
    # role = RoleSerializer()
    # department = serializers.SerializerMethodField()
    class Meta:
        model = Staff
        fields = '__all__'

    def get_department(self, obj):
        return DepartmentSerializer(obj.role.department).data


    def create(self, validated_data):
        #staff = Staff.objects.create(**validated_data)
        return Staff.objects.create(**validated_data)


class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = '__all__'

    def create(self, validated_data):
        return Receptionist.objects.create(**validated_data)


class BookAppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookAppointment
        fields = '__all__'

class DiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = ['diagnosis_id', 'register_id', 'diagnosis', 'Medicine_prefered', 'Take_test', 'notes']


class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = '__all__'


class LabTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTest
        fields = '__all__'








