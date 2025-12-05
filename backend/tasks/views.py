from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task, PomodoroSession
from .serializers import TaskSerializer, PomodoroSessionSerializer
from django.utils import timezone

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = super().get_queryset().order_by('-created_at')
        
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status=status)
        
        priority = self.request.query_params.get('priority', None)
        if priority:
            queryset = queryset.filter(priority=priority)
        
        return queryset

class PomodoroSessionViewSet(viewsets.ModelViewSet):
    queryset = PomodoroSession.objects.all()
    serializer_class = PomodoroSessionSerializer

    
    @action(detail=False, methods=['get'])
    def daily_stats(self, request):
        today = timezone.now().date()
        sessions_today = PomodoroSession.objects.filter(
            completed_at__date=today
        )
        
        tasks_completed_today = Task.objects.filter(
            status='COMPLETED',
            created_at__date=today
        ).count()
        
        stats = {
            'pomodoros_today': sessions_today.count(),
            'total_time_today': sum(s.duration_minutes for s in sessions_today),
            'tasks_completed': tasks_completed_today,
        }
        
        return Response(stats)