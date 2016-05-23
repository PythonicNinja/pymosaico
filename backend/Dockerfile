FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
RUN apt-get update && apt-get install -y -q mercurial
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
RUN adduser --disabled-password --gecos '' myuser
ADD . /code/
