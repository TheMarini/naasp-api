FROM node:latest
MAINTAINER @guigawiller
ENV NODE_ENV=development
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE 3000
