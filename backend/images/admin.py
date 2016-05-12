from django.contrib import admin
from models import *


class Image2FolderInline(admin.TabularInline):
    model = Image2Folder
    extra = 1


@admin.register(ImageFolder)
class ImageFolderAdmin(admin.ModelAdmin):
    inlines = [
        Image2FolderInline,
    ]


admin.site.register([Image])
