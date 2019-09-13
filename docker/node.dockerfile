FROM node:latest
MAINTAINER Guilherme Willer
ENV NODE_ENV=development
COPY . /var/www
WORKDIR /var/www
RUN yarn install
ENTRYPOINT ["yarn", "start"]
EXPOSE 3000
