FROM node:10.15.3-alpine

WORKDIR /web

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build

EXPOSE 8000
