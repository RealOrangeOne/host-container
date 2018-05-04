FROM node:8-alpine

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./site /var/www

WORKDIR /app

RUN apk add --no-cache git

RUN npm install

ENV NODE_ENV production

RUN npm run build

RUN npm prune --production

CMD npm start -- /var/www

EXPOSE 5000
