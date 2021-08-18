FROM python:3.9.6

ENV PYTHONUNBUFFERED 1

RUN apt-get update -qq && \
    apt-get install -y vim \
                       default-mysql-client \
                       gcc\
                       libmariadb-dev
RUN mkdir /src

WORKDIR /src

ADD ./backend/src/requirements.txt /src/
RUN pip install --upgrade pip
RUN pip install -r /src/requirements.txt

EXPOSE 8000
