#!/bin/bash

# Exit on any error
set -e

echo "Starting Django application..."

# Run database migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn server
echo "Starting Gunicorn server..."
exec gunicorn --bind 0.0.0.0:8000 --workers 2 --timeout 120 my_django_project.wsgi:application
