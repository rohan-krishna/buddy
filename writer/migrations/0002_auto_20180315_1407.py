# Generated by Django 2.0 on 2018-03-15 08:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('writer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='notebook',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notes', to='writer.Notebook'),
        ),
    ]
