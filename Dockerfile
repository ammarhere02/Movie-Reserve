FROM ubuntu:latest
LABEL authors="ammar-khan"

FROM node:alpine
COPY . /app
WORKDIR / app
CMD node app.js
ENTRYPOINT ["Ftop", "-b"]