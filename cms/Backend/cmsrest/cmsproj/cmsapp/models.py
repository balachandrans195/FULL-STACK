from datetime import timedelta

from django.db import models
from django.utils import timezone


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.department_name}"



class Role(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"





class Patient(models.Model):
    patient_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=1, blank=True, null=True)
    blood_group = models.CharField(max_length=5, blank=True, null=True)
    height = models.CharField(max_length=3)
    weight = models.CharField(max_length=3)
    date_registered = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name}"




class Admin(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.EmailField(unique=True, default='')
    dateandtime = models.DateTimeField(auto_now_add=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.username}"


class Login(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)


    def str(self):
        return self.email







class Staff(models.Model):
    staff_id = models.AutoField(primary_key=True)
    staff_name = models.CharField(max_length=255)
    phno = models.CharField(max_length=15)
    address = models.TextField()
    dob = models.DateField()
    qualification = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    doj = models.DateField()
    status = models.CharField(max_length=50)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    blood_group = models.CharField(max_length=5)
    password = models.CharField(max_length=255)
    Duty_time = models.CharField(max_length=255,default=False)

    consultation_fee = models.IntegerField()

    def __str__(self):
        return f"{self.staff_name}"








class Receptionist(models.Model):
    register_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    blood_group = models.CharField(max_length=5)
    contact = models.CharField(max_length=15)
    address = models.TextField()
    gender = models.CharField(max_length=10)
    dob = models.DateField()
    email = models.EmailField(unique=False)
    dov = models.DateField()
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    height = models.DecimalField(max_digits=5, decimal_places=2)
    age = models.IntegerField()

    def __str__(self):
        return f"{self.first_name} - {self.last_name}"




class BookAppointment(models.Model):
    appointment_id = models.AutoField(primary_key=True)
    token_no = models.CharField(max_length=10)
    register_id = models.ForeignKey(Receptionist, on_delete=models.CASCADE)
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    apnt_date = models.DateTimeField(unique=True)

    def __str__(self):
        return f"{self.appointment_id}"


# class RepBill(models.Model):
#     recbill_id = models.AutoField(primary_key=True)
#     register_id = models.ForeignKey(Receptionist, on_delete=models.CASCADE)
#     reg_fee = models.DecimalField(max_digits=10, decimal_places=2)
#     appointment_id = models.ForeignKey(BookAppointment, on_delete=models.CASCADE)
#     doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     # first_name = models.CharField(max_length=255)
#     # last_name = models.CharField(max_length=255)
#     data_and_time = models.DateTimeField()
#     total_amount = models.DecimalField(max_digits=10, decimal_places=2)


class Medicine(models.Model):
    med_id = models.AutoField(primary_key=True)
    generic_name = models.CharField(max_length=255)
    med_name = models.CharField(max_length=255)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    exp_date = models.DateField(default=timezone.now() + timezone.timedelta(days=90))

    def __str__(self):
        return f"{self.med_name} - {self.generic_name}"

class LabTest(models.Model):
    test_id = models.AutoField(primary_key=True)
    test_name = models.CharField(max_length=255)
    low_range = models.DecimalField(max_digits=10, decimal_places=2)
    high_range = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.test_name}"






class LoginDetails(models.Model):
    Logindetails_id = models.AutoField(primary_key=True)
    staff_id = models.ForeignKey(Staff, on_delete=models.CASCADE)
    logged_in = models.DateTimeField()
    logged_out = models.DateTimeField()



class Diagnosis(models.Model):
    diagnosis_id = models.AutoField(primary_key=True)
    register_id = models.ForeignKey(Receptionist, on_delete=models.CASCADE)
    diagnosis = models.CharField(max_length=255)
    Medicine_prefered = models.CharField(max_length=255,default="")
    Take_test = models.CharField(max_length=255,default="")
    notes = models.CharField(max_length=500,default="")

    def __str__(self):
        return f"{self.diagnosis_id}"






