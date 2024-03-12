
from django.utils import timezone
from datetime import timedelta
from datetime import datetime
from django.db import models



# Profile model representing additional information related to a User
class Customer(models.Model):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)  # Note: Storing passwords in plaintext is not recommended, consider using Django's built-in authentication system
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    dob = models.DateField()
    phone_number = models.CharField(max_length=15, unique=True)
    expiration_date = models.DateTimeField(blank=True, null=True)

    # Method to get all profiles associated with the customer
    def get_profiles(self):
        return self.profile_set.all()

    # Method to check if the membership is expired
    def is_membership_expired(self):
        return self.expiration_date and self.expiration_date < timezone.now()

    # Method to renew the membership based on the payment method
    def renew_membership(self, payment_method):
        if payment_method == 'basic':
            self.expiration_date = timezone.now() + timedelta(minutes=5)
        elif payment_method == 'standard':
            self.expiration_date = timezone.now() + timedelta(weeks=12)
        elif payment_method == 'premium':
            self.expiration_date = timezone.now() + timedelta(weeks=24)
        self.save()

    def __str__(self):
        return self.username


class Actor(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField()

    def __str__(self):
        return self.name


class Director(models.Model):
    name = models.CharField(max_length=255)
    bio = models.TextField()

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    url = models.URLField()
    genres = models.ManyToManyField(Genre)
    poster = models.ImageField(upload_to='movie_posters/', null=True, blank=True)
    cast = models.ManyToManyField(Actor)
    language = models.CharField(max_length=50)
    age_rating = models.CharField(max_length=10)
    director = models.ForeignKey(Director, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title


class AdultProfile(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    profilename = models.CharField(max_length=255)
    pin = models.CharField(max_length=4)
    avatar = models.ImageField(upload_to='adult_avatars/')

class KidProfile(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    profilename = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='kid_avatars/')




class Rating(models.Model):
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)
    profile = models.ForeignKey(AdultProfile, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    value = models.IntegerField(default=0)

class RecentlyViewed(models.Model):
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)
    profile = models.ForeignKey(AdultProfile, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.profile.profilename} viewed {self.movie.title}"

class Wishlist(models.Model):
    movie = models.ForeignKey('Movie', on_delete=models.CASCADE)
    profile = models.ForeignKey(AdultProfile, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    added_at = models.DateTimeField(default=datetime.now)


















class ChildMovieNew(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    release_date = models.DateField()
    url = models.URLField()
    poster = models.ImageField(upload_to='movie_posters/', null=True, blank=True)
    language = models.CharField(max_length=50)
    director_name = models.CharField(max_length=255)
    genres = models.CharField(max_length=500,default='')
    cast = models.CharField(max_length=500,default='')

    def __str__(self):
        return self.title

