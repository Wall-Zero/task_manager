from rest_framework import serializers
from .models import Task, PomodoroSession
from django.db import transaction

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class PomodoroSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PomodoroSession
        fields = '__all__'

    @transaction.atomic
    def create(self, validated_data):
        task = validated_data['task']
        duration = validated_data.get('duration_minutes', 25)

        session = super().create(validated_data)

        task.total_time_minutes += duration
        task.save(update_fields=['total_time_minutes'])

        return session