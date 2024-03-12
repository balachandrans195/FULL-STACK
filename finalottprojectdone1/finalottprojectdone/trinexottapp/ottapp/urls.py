from django.urls import path
from .views import home, login_view, trinex_view, registration_view, profile, profile_registration_view, \
    kid_profile_registration_view, pro, profile_detail, search_movies, movie_table, profile_pin, profile_creation, \
    content_view, update_profile, delete_profile, add_to_wishlist, rate_movie, \
    child_profile_view, child_search_movies, renew_page, logout, adultsearchback, recently_watched, \
    recently_viewed_movie

urlpatterns = [
    path('', home, name='home'),
    path('login/', login_view, name='login'),
    path('trinex/trinex.html', trinex_view, name='trinex'),
    path('registration/', registration_view, name='registration'),
    path('profile/<int:customer_id>/', profile, name='profile'),
    path('profile/register/<int:customer_id>/', profile_registration_view, name='profile_registration'),
    path('profile/register/kid/<int:customer_id>/', kid_profile_registration_view, name='kid_profile_registration'),
    path('pro/<int:customer_id>/', pro, name='pro'),
    path('profile/detail/<int:customer_id>/', profile_detail, name='profile_detail'),
    path('content/<int:customer_id>/', content_view, name='content_view'),
    path('profile_creation/<int:customer_id>/', profile_creation, name='profile_creation'),
    path('profile_pin/<int:customer_id>/<int:profile_id>/', profile_pin, name='profile_pin'),
    path('movie_table/<int:customer_id>/<int:profile_id>/', movie_table, name='movie_table'),
    path('update_profile/<int:customer_id>/<int:profile_id>/', update_profile, name='update_profile'),
    path('delete_profile/<int:customer_id>/<int:profile_id>/', delete_profile, name='delete_profile'),
    path('rate_movie/', rate_movie, name='rate_movie'),
    path('add_to_wishlist/<int:movie_id>/', add_to_wishlist, name='add_to_wishlist'),
    path('child_profile/', child_profile_view, name='child_profile_view'),
    path('child_search_movies/', child_search_movies, name='child_search_movies'),
    path('search/', search_movies, name='search_movies'),
    path('recently-viewed/', recently_viewed_movie, name='recently_viewed_movie'),
    path('renew/', renew_page, name='renew_page'),
    path('logout/', logout, name='logout'),
    # path('recently_watched/<int:profile_id>/', recently_watched_movies, name='recently_watched_movies'),

    path('recently_watched/<int:profile_id>/', recently_watched, name='recently_watched'),

    path('adultsearchback/', adultsearchback, name='adultsearchback'),

]




