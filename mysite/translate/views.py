from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####

def index(request):
    return HttpResponse("Hello, world. You're at the wiki index.")


def get_translation(request):
    imagelink = request.GET.get('topic', None)
    print('json-data to be sent: ', imagelink)
    data = {
        'summary': imagelink,
        'raw': 'Successful',
    }
    return JsonResponse(data)
