
from .models import Customer, Actor, Director, Genre, Movie, AdultProfile, KidProfile

from django.contrib import admin
from .models import ChildMovieNew

class ChildMovieNewAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'director_name')
    list_filter = ('language', 'release_date')
    search_fields = ('title', 'director_name')

admin.site.register(ChildMovieNew, ChildMovieNewAdmin)


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'username', 'password', 'email', 'dob', 'phone_number', 'expiration_date')

    def display_expiration_dates(self, obj):
        return obj.expiration_dates  # Replace 'expiration_dates' with the actual field or method name

    display_expiration_dates.short_description = 'Expiration Dates'  # Customize the column header

@admin.register(Actor)
class ActorAdmin(admin.ModelAdmin):
    list_display = ('name', 'bio')

@admin.register(Director)
class DirectorAdmin(admin.ModelAdmin):
    list_display = ('name', 'bio')

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'release_date', 'language', 'age_rating', 'director')

@admin.register(AdultProfile)
class AdultProfileAdmin(admin.ModelAdmin):
    list_display = ('customer', 'profilename', 'pin', 'avatar')

@admin.register(KidProfile)
class KidProfileAdmin(admin.ModelAdmin):
    list_display = ('customer', 'profilename', 'avatar')
