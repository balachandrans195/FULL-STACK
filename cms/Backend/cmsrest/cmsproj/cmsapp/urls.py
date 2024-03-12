from django.urls import path
from .views import signup, staff_detail, login, RegisterStaff, ReceptionistDetailView, ReceptionistListView, \
    BookAppointmentAPIView, department_list, role_list, BookAppointmentByStaffAPIView, BookAppointmentView, \
    DiagnosisListCreateView, DiagnosisDetailView, DepartmentByStaffIdView, BookAppointmentListView, MedicineAPIView, \
    DiagnosisAPIView, LabTestListCreateView, LabTestRetrieveUpdateDeleteView

urlpatterns = [
    path('departments/', department_list, name='department-list'),
    path('departments/<int:department_id>/', department_list, name='department-detail'),
    path('departments/staff/<int:staff_id>/', DepartmentByStaffIdView.as_view(), name='departments-by-staff'),

    path('roles/', role_list, name='role-list'),
    path('roles/<int:id>/', role_list, name='role-detail'),
    path('staff/', signup, name='staff-list'),
    path('staff/<int:staff_id>/', staff_detail, name='staff-detail'),
    path('api/login/', login, name='login'),
    path('api/register/', RegisterStaff.as_view(),name='RegisterAdmin'),
    path('receptionist/<int:receptionist_id>/', ReceptionistDetailView.as_view(), name='receptionist-detail'),
    path('receptionist', ReceptionistDetailView.as_view(), name='receptionist-detail'),
    path('receptionists/', ReceptionistListView.as_view(), name='receptionist-list'),
    path('receptionists/<int:register_id>/', ReceptionistListView.as_view(), name='receptionist-detail'),
    path('bookappointment/', BookAppointmentAPIView.as_view(), name='bookappointment-list'),
    path('bookappointment/<int:appointment_id>/', BookAppointmentAPIView.as_view(), name='bookappointment-detail'),
    path('bookappointment/', BookAppointmentAPIView.as_view(), name='bookappointment-list-create'),
    path('bookappointment/<int:appointment_id>/', BookAppointmentAPIView.as_view(), name='bookappointment-detail'),
    path('bookappointment/staff/<int:staff_id>/', BookAppointmentByStaffAPIView.as_view(),
         name='bookappointment-by-staff'),

    path('diagnosis/', DiagnosisListCreateView.as_view(), name='diagnosis-list-create'),
    path('diagnosis/<int:register_id>/', DiagnosisDetailView.as_view(), name='diagnosis-detail'),

    path('appointments/staff/<int:staff_id>/', BookAppointmentListView.as_view(), name='bookappointment-list'),

    path('bookappointment/staff/<int:staff_id>/<int:appointment_id>/', BookAppointmentView.as_view(),
         name='bookappointment-view-detail'),



    path('medicines/', MedicineAPIView.as_view(), name='medicine-list'),
    path('medicines/<int:med_id>/', MedicineAPIView.as_view(), name='medicine-detail'),
    path('diagnosises/<int:diagnosis_id>/', DiagnosisAPIView.as_view(), name='diagnosis-detail'),


    path('labtests/', LabTestListCreateView.as_view(), name='labtest-list-create'),
    path('labtests/<int:test_id>/', LabTestRetrieveUpdateDeleteView.as_view(), name='labtest-retrieve-update-delete'),
]


