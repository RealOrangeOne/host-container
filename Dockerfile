FROM node:8-alpine

COPY ./src /opt/tstatic/src
COPY ./package.json opt/tstatic/package.json
COPY ./package-lock.json opt/tstatic/package-lock.json
COPY ./tsconfig.json opt/tstatic/tsconfig.json
COPY ./site /var/www

WORKDIR /opt/tstatic

RUN apk add --no-cache git

RUN npm install

ENV NODE_ENV production

RUN npm run build

RUN npm prune --production

RUN npm install -g .

WORKDIR /

CMD tstatic /var/www

EXPOSE 5000
