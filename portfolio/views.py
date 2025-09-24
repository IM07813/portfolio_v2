from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

def index(request):
    """Main portfolio view"""
    if request.method == 'POST':
        # Handle contact form submission
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        # For now, we'll just print the form data
        # In a real application, you'd save this to database or send email
        print(f"Contact form submitted:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Message: {message}")
        
        # You could add a success message here
        return render(request, 'portfolio/index.html', {
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.'
        })
    
    return render(request, 'portfolio/index.html')
