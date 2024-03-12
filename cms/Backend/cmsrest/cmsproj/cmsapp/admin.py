from django.contrib import admin
from .models import Role, Staff, Admin, Patient, Login, Department, Receptionist, BookAppointment, Diagnosis, Medicine, LabTest

admin.site.register(Diagnosis)
admin.site.register(Role)

class StaffAdmin(admin.ModelAdmin):  # Inherit from admin.ModelAdmin
    search_fields = ['staff_name']

admin.site.register(Staff, StaffAdmin)

class ReceptionistAdmin(admin.ModelAdmin):  # Inherit from admin.ModelAdmin
    search_fields = ['first_name', 'last_name']

admin.site.register(Receptionist, ReceptionistAdmin)

class MedicineAdmin(admin.ModelAdmin):  # Inherit from admin.ModelAdmin
    search_fields = ['generic_name', 'med_name']

admin.site.register(Medicine, MedicineAdmin)

class LabTestAdmin(admin.ModelAdmin):
    search_fields = ['test_name']

admin.site.register(LabTest, LabTestAdmin)

# Register the missing Admin model
admin.site.register(Admin)
