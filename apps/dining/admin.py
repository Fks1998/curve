from django.contrib import admin
from dining.models import Menu, Dining, FreeMeal
# Register your models here.
# Admin Models which will be able to manipulate the back end features and will have specific roles
# for instance, there are three distinct admin models which will be used in this program which are:
# - MenuAdmin: This is the user who will be able to manage the back end features for the menu
# - DiningAdmin: This is the user who will be able to manage the back end features for the people dining in the Curve
# - FreeMealAdmin: This is the admin who will be able to manage the back end features for the people who select free meals
class MenuAdmin(admin.ModelAdmin):
    model = Menu
    list_per_page = 10
    list_display = ('name', 'price')

class DiningAdmin(admin.ModelAdmin):
    model = Dining
    list_per_page = 10
    list_display = ('user', 'date', 'menu', 'dining_status')
    list_filter = ('date', 'menu', 'dining_status')

class FreeMealAdmin(admin.ModelAdmin):
    model = Dining
    list_per_page = 10
    list_display = ('user', 'date', 'meal', 'requested_date')
    list_filter = ('date', 'meal', 'requested_date')

# After specifying the admin users, models are registered accordingly with their admin user
admin.site.register(Menu, MenuAdmin)
admin.site.register(Dining, DiningAdmin)
admin.site.register(FreeMeal, FreeMealAdmin)
