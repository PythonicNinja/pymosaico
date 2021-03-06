# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-11 17:02
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('images', '0003_remove_imagefolder_index'),
    ]

    operations = [
        migrations.CreateModel(
            name='Mosaico',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('name', models.CharField(max_length=255, verbose_name='Name')),
                ('target', models.ImageField(upload_to='target/%Y/%m/%d', verbose_name='Target image')),
                ('status', models.PositiveSmallIntegerField(choices=[(0, 'Initial'), (1, 'Rendering'), (2, 'Finished'), (10, 'Error'), (11, 'Canceled')], default=0, verbose_name='Status')),
                ('result_image', models.ImageField(blank=True, null=True, upload_to='mosaico/%Y/%m/%d', verbose_name='Out file')),
                ('images_folder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='images.ImageFolder')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'abstract': False,
                'get_latest_by': 'modified',
            },
        ),
    ]
