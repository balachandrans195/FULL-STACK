
from .models import  KidProfile
from .models import AdultProfile
from django import forms

class UpdateProfileForm(forms.ModelForm):
    class Meta:
        model = AdultProfile
        fields = ['profilename', 'pin']

class MyLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)






class RatingForm(forms.Form):
    rating = forms.IntegerField(
        label='Your Rating',
        min_value=1,
        max_value=5,
        widget=forms.NumberInput(attrs={'class': 'form-control'})
    )

from django import forms
from django.core.validators import RegexValidator, MinLengthValidator
from .models import Customer

class CustomerRegistrationForm(forms.ModelForm):
    PAYMENT_CHOICES = [
        ('basic', 'Basic'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]

    payment_method = forms.ChoiceField(
        label="Payment Method",
        choices=PAYMENT_CHOICES,
        widget=forms.Select(attrs={'class': 'form-control'}),
    )

    alphanumeric_validator = RegexValidator(
        regex=r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$',
        message="Enter a valid alphanumeric value with both letters and numbers."
    )

    password_validator = MinLengthValidator(
        limit_value=8,
        message="Password must be at least 8 characters long."
    )

    alpha_validator = RegexValidator(
        regex=r'^[A-Za-z]+$',
        message="Enter only alphabet characters."
    )

    username = forms.CharField(
        label="Username :",
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[alphanumeric_validator],
    )

    password = forms.CharField(
        label="Password:",
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        validators=[alphanumeric_validator, password_validator],
    )

    first_name = forms.CharField(
        label="First Name:",
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[alpha_validator],
    )

    last_name = forms.CharField(
        label="Last Name:",
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[alpha_validator],
    )

    phone_number = forms.CharField(
        label="Phone Number",
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        validators=[RegexValidator(regex=r'^\d{10}$', message="Phone number must be 10 digits.")],
    )

    class Meta:
        model = Customer
        fields = ['username', 'password', 'first_name', 'last_name', 'email', 'dob', 'phone_number', 'payment_method']

    def clean_dob(self):
        dob = self.cleaned_data.get('dob')
        if dob and dob.year >= 2015:
            raise forms.ValidationError("Date of birth must be before 2015")
        return dob


class AdultProfileForm(forms.ModelForm):
    class Meta:
        model = AdultProfile
        fields = ['profilename', 'pin', 'avatar']

class KidProfileForm(forms.ModelForm):
    class Meta:
        model = KidProfile
        fields = ['profilename', 'avatar']


class PINVerificationForm(forms.Form):
    pin = forms.CharField(widget=forms.PasswordInput(attrs={'required': 'required'}))