from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, PomodoroSessionViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'pomodoro-sessions', PomodoroSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]