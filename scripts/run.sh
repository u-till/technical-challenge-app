#!/usr/bin/env bash

rm -rf /frontend/build/* && cp -r /frontend_tmp/build/* /frontend/build
python manage.py collectstatic --no-input
python manage.py makemigrations --no-input
python manage.py migrate
gunicorn -w 4 -b 0.0.0.0:8000 luna_project.wsgi:application