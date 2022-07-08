from django.contrib import admin
from admin.graphql import register
from dummy.models import Person

admin.site.register(Person)
schema = register([Person])["schema"]