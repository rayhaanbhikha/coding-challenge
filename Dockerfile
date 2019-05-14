FROM node:10.15-alpine as base

FROM base as db
WORKDIR /home/json-server
COPY ./json-server ./

RUN npm install -g --production json-server

EXPOSE 3000

FROM base as app
WORKDIR /home/app
COPY ./application ./

EXPOSE 8080
RUN npm install --production --loglevel=error