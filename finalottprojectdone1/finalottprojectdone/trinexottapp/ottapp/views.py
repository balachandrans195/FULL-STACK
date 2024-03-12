
from .forms import MyLoginForm, PINVerificationForm
from django.db import models
from .forms import  KidProfileForm
from django.urls import reverse
from datetime import  date
from .models import  KidProfile
from django.core.mail import send_mail
from .forms import CustomerRegistrationForm  # Import your registration form

from .forms import UpdateProfileForm
from django.http import HttpResponse
from django.http import JsonResponse
from .models import  Movie, AdultProfile
from .models import  Rating
from .forms import AdultProfileForm
from .models import ChildMovieNew
from django.shortcuts import  redirect, get_object_or_404


def recently_viewed_movie(request):
    if request.method == 'POST':
        try:
            movie_id = request.POST.get('movie_id')
            profile_id = request.POST.get('profile_id')

            # Fetch the movie and profile objects
            movie = Movie.objects.get(id=movie_id)
            profile = AdultProfile.objects.get(id=profile_id)

            # Assuming the customer is associated with the profile (you might need to adjust this based on your actual relationship)
            customer = profile.customer

            # Check if the movie is already in the recently viewed list for the given profile and customer
            existing_entry = RecentlyViewed.objects.filter(movie=movie, profile=profile, customer=customer).first()

            if not existing_entry:
                # Create a new RecentlyViewed entry if not already exists
                RecentlyViewed.objects.create(movie=movie, profile=profile, customer=customer)

            return JsonResponse({'success_message': 'Movie added to recently viewed successfully'})
        except Exception as e:
            return JsonResponse({'error_message': f'Failed to add movie to recently viewed. Error: {str(e)}'}, status=500)

    return JsonResponse({'error_message': 'Invalid request method'}, status=400)





def recently_watched(request, profile_id):
    # Retrieve recently watched movies for the specified profile
    recently_watched_movies = RecentlyViewed.objects.filter(profile_id=profile_id).order_by('-timestamp')[:10]
    profile = AdultProfile.objects.get(id=profile_id)

    # You can add more context data if needed
    context = {
        'recently_watched_movies': recently_watched_movies,
        'profile': profile,
    }

    return render(request, 'recently_watched.html', context)



def child_search_movies(request):
    # Get the search query from the URL parameter
    query = request.GET.get('search', '')

    # Perform a case-insensitive search on relevant fields
    movies = ChildMovieNew.objects.filter(
        models.Q(title__icontains=query) |  # Case-insensitive title matching
        models.Q(director_name__icontains=query) |  # Case-insensitive director name matching
        models.Q(cast__icontains=query) |  # Case-insensitive actor name matching
        models.Q(genres__icontains=query) |  # Case-insensitive genre matching
        models.Q(language__icontains=query)  # Case-insensitive language matching
    ).distinct()

    context = {'movies': movies,'query':query}
    return render(request, 'child_profile_view.html', context)




def child_profile_view(request):
    # Fetch all ChildMovieNew instances from the database
    movies = ChildMovieNew.objects.all()

    # Pass the movies to the template
    return render(request, 'child_profile_view.html', {'movies': movies})


def rate_movie(request):
    if request.method == 'POST':
        try:
            movie_id = request.POST.get('movie_id')
            customer_id = request.POST.get('customer_id')
            profile_id = request.POST.get('profile_id')
            rating_value = request.POST.get('rating')

            movie = get_object_or_404(Movie, id=movie_id)
            # Assuming AdultProfile is the model for profiles
            profile = get_object_or_404(AdultProfile, customer_id=customer_id, id=profile_id)

            # Check if the rating already exists for the movie and profile
            rating, created = Rating.objects.get_or_create(movie=movie, profile=profile, defaults={'value': rating_value})

            if not created:
                # Update the existing rating
                rating.value = rating_value
                rating.save()

            return JsonResponse({'success_message': 'Rating submitted successfully'})
        except Exception as e:
            return JsonResponse({'error_message': f'Failed to submit rating. Error: {str(e)}'}, status=500)

    return JsonResponse({'error_message': 'Invalid request method'}, status=400)




def add_to_wishlist(request, movie_id):
    # Your view logic here
    return HttpResponse('<h1>Not ren</h1>') # You can replace 'wishlist_added.html' with your desired template






def update_profile(request, customer_id, profile_id):
    profile = get_object_or_404(AdultProfile, customer_id=customer_id, id=profile_id)

    if request.method == 'POST':
        form = UpdateProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()
            return redirect('profile', customer_id=customer_id)
        else:
            print(form.errors)  # Print form errors to the console for debugging
    else:
        form = UpdateProfileForm(instance=profile)

    return render(request, 'update_profile.html', {'form': form, 'profile': profile})


def delete_profile(request, customer_id, profile_id):
    # Fetch the profile to be deleted
    profile = get_object_or_404(AdultProfile, customer_id=customer_id, id=profile_id)

    if request.method == 'POST':
        # Handle the delete logic here
        profile.delete()
        return redirect('profile', customer_id=customer_id)  # Redirect to the profile page after deleting

    return render(request, 'delete_profile.html', {'profile': profile})


def content_view(request, customer_id):
    profile = get_object_or_404(AdultProfile, customer_id=customer_id)
    content = profile.content  # Replace 'content' with the actual attribute in your model

    return render(request, 'content.html', {'content': content, 'profile': profile})




def profile_creation(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)
    max_adult_profiles = 4

    current_adult_profiles_count = AdultProfile.objects.filter(customer=customer).count()

    if current_adult_profiles_count >= max_adult_profiles:
        # If the maximum limit is reached, include an alert message in the context
        alert_message = 'Maximum limit of adult profiles (4) reached for this customer.'
        context = {'customer': customer, 'alert_message': alert_message}
        return render(request, 'user/profile.html', context)

    if request.method == 'POST':
        form = AdultProfileForm(request.POST, request.FILES)
        if form.is_valid():
            profile = form.save(commit=False)
            profile.customer = customer
            profile.save()
            return redirect('profile', customer_id=customer_id)
    else:
        form = AdultProfileForm()

    context = {'form': form, 'customer': customer}
    return render(request, 'user/profile_creation.html', context)




def profile_pin(request, customer_id, profile_id):
    customer = get_object_or_404(Customer, id=customer_id)
    profile = get_object_or_404(AdultProfile, id=profile_id, customer=customer)

    if request.method == 'POST':
        pin_form = PINVerificationForm(request.POST)

        if pin_form.is_valid():
            entered_pin = pin_form.cleaned_data['pin']

            if entered_pin == profile.pin:
                # PIN is correct, redirect to the movie_list function
                return redirect(reverse('movie_table', kwargs={'customer_id': customer_id, 'profile_id': profile_id}))

            else:
                # PIN is incorrect, show an error message
                pin_form.add_error('pin', 'Incorrect PIN. Please try again.')

    else:
        # If the request is not a POST, initialize an empty form
        pin_form = PINVerificationForm()

    return render(request, 'pin_verification.html', {'customer': customer, 'profile': profile, 'pin_form': pin_form})



def home(request):
    return render(request, 'user/home.html')





def profile(request, customer_id):
    # Fetch the customer or return a 404 response if not found
    customer = get_object_or_404(Customer, id=customer_id)

    # Fetch adult profiles associated with the customer
    adult_profiles = AdultProfile.objects.filter(customer=customer)

    # Fetch kid profiles associated with the customer
    kid_profiles = KidProfile.objects.filter(customer=customer)

    # Pass the customer and profiles to the template
    context = {'customer': customer, 'adult_profiles': adult_profiles, 'kid_profiles': kid_profiles}
    return render(request, 'user/profile.html', context)



def login_view(request):
    if request.method == 'POST':
        login_form = MyLoginForm(request.POST)
        if login_form.is_valid():
            cleaned_data = login_form.cleaned_data
            username = cleaned_data['username']
            password = cleaned_data['password']

            try:
                customer = Customer.objects.get(username=username, password=password)

                # Check if the expiration_date is not expired
                if customer.expiration_date and customer.expiration_date.date() >= date.today():
                    # Expiration date is valid, redirect to profile with customer_id
                    return redirect('profile', customer_id=customer.id)
                else:
                    # Expiration date is expired, redirect to renew page
                    return redirect('renew_page')

            except Customer.DoesNotExist:
                return HttpResponse('<h1>Not Authenticated</h1>')

    else:
        login_form = MyLoginForm()

    return render(request, template_name='user/login.html', context={'login_form': login_form})


def registration_view(request):
    if request.method == 'POST':
        form = CustomerRegistrationForm(request.POST)
        if form.is_valid():
            # Save the form data to the database
            customer = form.save(commit=False)

            # Set the expiration_date based on the selected payment method
            payment_method = form.cleaned_data['payment_method']
            customer.renew_membership(payment_method)

            # Save the customer instance with the updated expiration_date
            customer.save()

            # Send a welcome email to the registered user
            send_mail(
                'Welcome to TRINEX',
                'Dear user,\n\nThank you for registering on TRINEX Website. We are excited to have you on board!',
                'bala1022389@gmail.com',  # Replace with your actual email
                [customer.email],
                fail_silently=False,
            )

            # Redirect to the login page or any other page you want
            return render(request, 'user/login.html')
    else:
        form = CustomerRegistrationForm()

    return render(request, 'user/registration.html', {'form': form})







def profile_registration_view(request, customer_id):
    customer = get_object_or_404(Customer, id=customer_id)
    template_name = 'user/profile_creation.html'

    total_profiles = AdultProfile.objects.filter(customer=customer).count()

    if total_profiles >= 4:
        return render(request, 'error.html')

    if request.method == 'POST':
        profile_form = AdultProfileForm(request.POST, request.FILES)

        if profile_form.is_valid():
            profile = profile_form.save(commit=False)
            profile.customer = customer
            profile.save()

            return redirect('profile_detail', customer_id=customer.id)

    else:
        profile_form = AdultProfileForm()

    return render(request, template_name, {'customer': customer, 'profile_form': profile_form})
def kid_profile_registration_view(request, customer_id):
    customer = Customer.objects.get(id=customer_id)
    template_name = 'kid_registration.html'

    total_profiles = KidProfile.objects.filter(customer=customer).count()

    if total_profiles >= 2:
        return render(request, 'error.html')

    if request.method == 'POST':
        profile_form = KidProfileForm(request.POST, request.FILES)

        if profile_form.is_valid():
            kid_profile = profile_form.save(commit=False)
            kid_profile.customer = customer
            kid_profile.save()

            return JsonResponse({})

    else:
        profile_form = KidProfileForm()

    return render(request, template_name, {'customer': customer, 'profile_form': profile_form})


def pro(request, customer_id):
    # Fetch the customer or return a 404 response if not found
    customer = get_object_or_404(Customer, id=customer_id)

    # Pass the customer to the template
    context = {'customer': customer}
    return render(request, 'user/add_profile.html', context)

def profile_detail(request, customer_id):
    profiles = AdultProfile.objects.filter(customer_id=customer_id)

    if profiles.exists():
        # If there are multiple profiles, you may want to choose one
        all_profiles = AdultProfile.objects.all()  # You can change this logic based on your requirements
        return render(request, 'user/profile_detail.html', {'all_profiles': all_profiles})
    else:
        return render(request, 'profile_not_found.html')  # Create a template for profile not


from django.shortcuts import render
from .models import Customer, RecentlyViewed



def movie_table(request, customer_id, profile_id):
    profile = get_object_or_404(AdultProfile, customer_id=customer_id, id=profile_id)
    movies = Movie.objects.all()

    return render(request, 'movie_table.html', {'movies': movies, 'profile': profile})




def search_movies(request):
    # Get the search query from the GET parameters
    query = request.GET.get('search', '')

    # Search for movies that match the query in title, director name, genre, actor, and language
    movies = Movie.objects.filter(
        models.Q(title__icontains=query) |  # Case-insensitive title matching
        models.Q(director__name__icontains=query) |  # Case-insensitive director name matching
        models.Q(cast__name__icontains=query) |  # Case-insensitive actor name matching
        models.Q(genres__name__icontains=query) |  # Case-insensitive genre matching
        models.Q(language__icontains=query)  # Case-insensitive language matching
    ).distinct()

    # Render the search results in the movie_table template
    return render(request, 'search_results.html', {'movies': movies, 'query': query})

def trinex_view(request):
    return render(request, 'trinex/trinex.html')


def renew_page(request):
    return render(request, template_name='renew_page.html')

def logout(request):
    return render(request, template_name='user/login.html')

def adultsearchback(request):
    return render(request, template_name='movie_table.html')
