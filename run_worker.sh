#!/bin/sh
cd backend
su -m myuser -c "celery -A project -l DEBUG worker"
cd ../
