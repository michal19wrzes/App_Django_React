# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
<<<<<<< HEAD
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()), 
=======
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
>>>>>>> bc8ff1de78d69a46ffd7a53fce4f5a8ae83b7caa
]
