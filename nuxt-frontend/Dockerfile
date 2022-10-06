FROM node:10.15.3-alpine

WORKDIR /web

COPY package*.json ./
RUN npm install

COPY . ./

ENV NUXT_PORT=$NUXT_PORT

RUN npm run build