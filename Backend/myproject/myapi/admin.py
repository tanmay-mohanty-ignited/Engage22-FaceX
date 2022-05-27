from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Criminals)
admin.site.register(CriminalImgDetect)
admin.site.register(CriminalVideoDetect)
admin.site.register(AppUsers)

