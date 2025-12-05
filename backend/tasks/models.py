from django.db import models
from .choices import TASK_PRIORITY_CHOICES, TASK_STATUS_CHOICES

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    priority = models.CharField(max_length=10, choices=TASK_PRIORITY_CHOICES, default='MEDIUM')
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, default='PENDING')
    total_time_minutes = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    

class PomodoroSession(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='pomodoro_sessions')
    duration_minutes = models.IntegerField(default=25)
    completed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.task.title} - {self.duration_minutes}min"