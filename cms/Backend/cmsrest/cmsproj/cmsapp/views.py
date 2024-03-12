from django.shortcuts import get_object_or_404

from .models import Login, BookAppointment, Department, Role, LabTest
from .serializers import RegisterStaffSerializer, ReceptionistSerializer, \
    DepartmentSerializer, RoleSerializer, LabTestSerializer
from .serializers import SignupSerializer
from rest_framework.decorators import api_view
from rest_framework import permissions

from .models import Staff
from .serializers import LoginSerializer
from .models import Receptionist
from .models import BookAppointment
from .serializers import BookAppointmentSerializer
from .models import Diagnosis
from .serializers import DiagnosisSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Medicine
from .serializers import MedicineSerializer





@api_view(['GET'])
def department_list(request):
    try:
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    except Department.DoesNotExist:
        return Response(
            {"message": "No departments found"},
            status=status.HTTP_404_NOT_FOUND
        )
@api_view(['GET'])
def role_list(request, id=None):
    if id is not None:
        # Retrieve a specific role by ID
        try:
            role = Role.objects.get(id=id)
            serializer = RoleSerializer(role)
            return Response(serializer.data)
        except Role.DoesNotExist:
            return Response({'error': 'Role not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        # List all roles
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)
@api_view(['GET', 'POST'])
def signup(request):
    if request.method == 'GET':
        staff = Staff.objects.all()
        serializer = SignupSerializer(staff, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            # Create Staff object
            staff = Staff.objects.create(**data)
            # Create Login object
            Login.objects.create(email=data['email'], password=data['password'], role=staff.role)
            return Response({'message': 'Signup successful'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'PUT', 'DELETE'])
def staff_detail(request, staff_id):
    try:
        staff = Staff.objects.get(pk=staff_id)
    except Staff.DoesNotExist:
        return Response({'error': 'Staff member not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SignupSerializer(staff)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = SignupSerializer(staff, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        staff.delete()
        return Response({'message': 'Staff member deleted successfully'}, status=status.HTTP_204_NO_CONTENT)




@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data.get('email')
            password = data.get('password')

            # Check if the email and password match in the Staff table
            try:
                staff = Staff.objects.get(email=email, password=password)
                role_id = staff.role_id  # Get the role_id from the Staff instance
                staff_id = staff.staff_id  # Get the staff_id from the Staff instance

                return Response({
                    'message': 'Login successful',
                    'role_id': role_id,
                    'staff_id': staff_id
                }, status=status.HTTP_200_OK)
            except Staff.DoesNotExist:
                return Response({'error': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
class RegisterStaff(APIView):
    def get(self, request):
        # Assuming you have a model named Staff and a corresponding serializer
        staff_objects = Staff.objects.all()  # Retrieve all staff objects from the database
        serializer = RegisterStaffSerializer(staff_objects, many=True)  # Use your actual serializer

        return Response(
            data={
                "hasError": False,
                "statusCode": 200,
                "message": "Staff data retrieved successfully",
                "response": serializer.data,
            },
            status=status.HTTP_200_OK
        )

    def post(self, request):
        serializer = RegisterStaffSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data={
                    "hasError": False,
                    "statusCode": 200,
                    "message": "Staff register successful",
                    "response": serializer.data,
                },
                status=status.HTTP_200_OK
            )

        return Response(
            data={
                "hasError": True,
                "statusCode": 404,
                "message": "Staff register not successful",
                "response": serializer.errors,
            },
            status=status.HTTP_404_NOT_FOUND
        )

class ReceptionistDetailView(APIView):
    def get(self, request, receptionist_id):
        try:
            receptionist = Receptionist.objects.get(pk=receptionist_id)
            serializer = ReceptionistSerializer(receptionist)
            return Response(
                data={
                    "hasError": False,
                    "statusCode": status.HTTP_200_OK,
                    "message": "Receptionist details retrieved successfully",
                    "response": serializer.data,
                },
                status=status.HTTP_200_OK
            )
        except Receptionist.DoesNotExist:
            return Response(
                data={
                    "hasError": True,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "message": f"Receptionist with id {receptionist_id} does not exist",
                    "response": None,
                },
                status=status.HTTP_404_NOT_FOUND
            )

    def post(self, request):
        serializer = ReceptionistSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data={
                    "hasError": False,
                    "statusCode": status.HTTP_201_CREATED,
                    "message": "Receptionist registered successfully",
                    "response": serializer.data,
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            data={
                "hasError": True,
                "statusCode": status.HTTP_400_BAD_REQUEST,
                "message": "Receptionist registration failed",
                "response": serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    
    



class ReceptionistListView(APIView):
    def get(self, request, register_id=None):
        queryset = Receptionist.objects.filter(register_id=register_id) if register_id else Receptionist.objects.all()
        serializer = ReceptionistSerializer(queryset, many=True)

        if not queryset.exists():
            return Response(
                data={
                    "hasError": True,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "message": f"Receptionist with id {register_id} does not exist",
                    "response": None,
                },
                status=status.HTTP_404_NOT_FOUND,
                headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
            )

        return Response(
            data={
                "hasError": False,
                "statusCode": status.HTTP_200_OK,
                "message": "Receptionist details retrieved successfully",
                "response": serializer.data,
            },
            status=status.HTTP_200_OK,
            headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
        )

    def post(self, request):
        serializer = ReceptionistSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data={
                    "hasError": False,
                    "statusCode": status.HTTP_201_CREATED,
                    "message": "Receptionist created successfully",
                    "response": serializer.data,
                },
                status=status.HTTP_201_CREATED,
                headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
            )
        else:
            return Response(
                data={
                    "hasError": True,
                    "statusCode": status.HTTP_400_BAD_REQUEST,
                    "message": "Invalid data",
                    "response": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
                headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
            )

    def put(self, request, register_id):
        try:
            receptionist = Receptionist.objects.get(register_id=register_id)
        except Receptionist.DoesNotExist:
            return Response(
                data={
                    "hasError": True,
                    "statusCode": status.HTTP_404_NOT_FOUND,
                    "message": f"Receptionist with id {register_id} does not exist",
                    "response": None,
                },
                status=status.HTTP_404_NOT_FOUND,
                headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
            )

        serializer = ReceptionistSerializer(receptionist, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                data={
                    "hasError": False,
                    "statusCode": status.HTTP_200_OK,
                    "message": "Receptionist updated successfully",
                    "response": serializer.data,
                },
                status=status.HTTP_200_OK,
                headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
            )
        else:
            return Response(
                data={
                    "hasError": True,
                    "statusCode": status.HTTP_400_BAD_REQUEST,
                    "message": "Invalid data",
                    "response": serializer.errors,
                },
                status=status.HTTP_400_BAD_REQUEST,
                headers={'Access-Control-Allow-Origin': '*'}  # Allow all origins for simplicity
            )

class BookAppointmentAPIView(APIView):
    def get(self, request, appointment_id=None):
        if appointment_id:
            try:
                appointment = BookAppointment.objects.get(appointment_id=appointment_id)
                serializer = BookAppointmentSerializer(appointment)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BookAppointment.DoesNotExist:
                return Response(
                    {'message': f'Appointment with id {appointment_id} does not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )

        appointments = BookAppointment.objects.all()
        serializer = BookAppointmentSerializer(appointments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BookAppointmentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, appointment_id):
        try:
            appointment = BookAppointment.objects.get(appointment_id=appointment_id)
        except BookAppointment.DoesNotExist:
            return Response(
                {'message': f'Appointment with id {appointment_id} does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BookAppointmentSerializer(appointment, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        try:
            appointment = BookAppointment.objects.get(appointment_id=appointment_id)
            appointment.delete()
            return Response({'message': f'Appointment with id {appointment_id} deleted successfully'},
                            status=status.HTTP_204_NO_CONTENT)
        except BookAppointment.DoesNotExist:
            return Response({'message': f'Appointment with id {appointment_id} does not exist'},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'message': f'Error deleting appointment: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookAppointmentByStaffAPIView(APIView):
    def get(self, request, staff_id):
        if staff_id:
            try:
                appointments = BookAppointment.objects.filter(staff_id=staff_id)
                serializer = BookAppointmentSerializer(appointments, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except BookAppointment.DoesNotExist:
                return Response(
                    {'message': f'Appointments for staff with id {staff_id} do not exist'},
                    status=status.HTTP_404_NOT_FOUND
                )
        else:
            return Response(
                {'message': 'Invalid staff ID'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def post(self, request):
        serializer = BookAppointmentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, appointment_id):
        try:
            appointment = BookAppointment.objects.get(appointment_id=appointment_id)
        except BookAppointment.DoesNotExist:
            return Response(
                {'message': f'Appointment with id {appointment_id} does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = BookAppointmentSerializer(appointment, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        try:
            appointment = BookAppointment.objects.get(appointment_id=appointment_id)
        except BookAppointment.DoesNotExist:
            return Response(
                {'message': f'Appointment with id {appointment_id} does not exist'},
                status=status.HTTP_404_NOT_FOUND
            )

        appointment.delete()
        return Response({'message': 'Appointment deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



class BookAppointmentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, staff_id, appointment_id=None):
        if appointment_id:
            appointment = BookAppointment.objects.get(staff_id=staff_id, appointment_id=appointment_id)
            serializer = BookAppointmentSerializer(appointment)
        else:
            appointments = BookAppointment.objects.filter(staff_id=staff_id)
            serializer = BookAppointmentSerializer(appointments, many=True)

        return Response(serializer.data)

    def post(self, request, staff_id):
        data = {'staff_id': staff_id, **request.data}
        serializer = BookAppointmentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, appointment_id):
        print(f"Deleting appointment with id: {appointment_id}")
        try:
            appointment = BookAppointment.objects.get(appointment_id=appointment_id)
            appointment.delete()
            return Response({'message': f'Appointment with id {appointment_id} deleted successfully'},
                            status=status.HTTP_204_NO_CONTENT)
        except BookAppointment.DoesNotExist:
            print(f'Appointment with id {appointment_id} does not exist')
            return Response({'message': f'Appointment with id {appointment_id} does not exist'},
                            status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f'Error deleting appointment: {str(e)}')
            return Response({'message': f'Error deleting appointment: {str(e)}'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class DiagnosisListCreateView(APIView):
    def get(self, request, *args, **kwargs):
        diagnoses = Diagnosis.objects.all()
        serializer = DiagnosisSerializer(diagnoses, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = DiagnosisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class DiagnosisDetailView(APIView):
    def get_objects(self, register_id):
        return Diagnosis.objects.filter(register_id=register_id)

    def get(self, request, *args, **kwargs):
        register_id = kwargs.get('register_id')
        diagnoses = self.get_objects(register_id)

        if diagnoses.exists():
            serializer = DiagnosisSerializer(diagnoses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
    def post(self, request, *args, **kwargs):
        serializer = DiagnosisSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                register_id=kwargs.get('register_id'))  # Assuming register_id is a ForeignKey in Diagnosis model
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DepartmentByStaffIdView(APIView):
    def get(self, request, staff_id, format=None):
        try:
            departments = Department.objects.filter(staff=staff_id)  # Corrected line
            serializer = DepartmentSerializer(departments, many=True)
            return Response(serializer.data)
        except Department.DoesNotExist:
            return Response(
                {"message": f"Departments for staff ID {staff_id} not found"},
                status=status.HTTP_404_NOT_FOUND
            )




class BookAppointmentListView(APIView):
    def get(self, request, staff_id, format=None):
        try:
            appointments = BookAppointment.objects.filter(staff_id=staff_id)
            serializer = BookAppointmentSerializer(appointments, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class MedicineAPIView(APIView):
    def get(self, request, med_id=None):
        if med_id:
            # Retrieve a specific medicine by med_id
            try:
                medicine = Medicine.objects.get(med_id=med_id)
                serializer = MedicineSerializer(medicine)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Medicine.DoesNotExist:
                return Response({'message': 'Medicine not found'}, status=status.HTTP_404_NOT_FOUND)
        else:
            # Retrieve all medicines
            medicines = Medicine.objects.all()
            serializer = MedicineSerializer(medicines, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, med_id):
        try:
            # Retrieve the medicine by med_id
            medicine = Medicine.objects.get(med_id=med_id)
        except Medicine.DoesNotExist:
            return Response({'message': 'Medicine not found'}, status=status.HTTP_404_NOT_FOUND)

        # Delete the medicine
        medicine.delete()
        return Response({'message': 'Medicine deleted successfully'}, status=status.HTTP_204_NO_CONTENT)



class DiagnosisAPIView(APIView):
    def delete(self, request, diagnosis_id):
        diagnosis = get_object_or_404(Diagnosis, diagnosis_id=diagnosis_id)
        diagnosis.delete()
        return Response({"detail": "Diagnosis deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class LabTestListCreateView(APIView):
    def get(self, request):
        lab_tests = LabTest.objects.all()
        serializer = LabTestSerializer(lab_tests, many=True)
        return Response({"message": "Lab tests retrieved successfully", "data": serializer.data})

    def post(self, request):
        serializer = LabTestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Lab test created successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LabTestRetrieveUpdateDeleteView(APIView):
    def get_object(self, test_id):
        return get_object_or_404(LabTest, test_id=test_id)

    def get(self, request, test_id):
        lab_test = self.get_object(test_id)
        serializer = LabTestSerializer(lab_test)
        return Response({"message": "Lab test details retrieved successfully", "data": serializer.data})

    def put(self, request, test_id):
        lab_test = self.get_object(test_id)
        serializer = LabTestSerializer(lab_test, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Lab test updated successfully", "data": serializer.data})
        return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, test_id):
        lab_test = self.get_object(test_id)
        lab_test.delete()
        return Response({"message": "Lab test deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
