FROM node:6-alpine

RUN mkdir -p /public

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./typings.json /app/typings.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

RUN npm install

RUN node_modules/.bin/typings install

RUN npm run build

CMD npm start -- /public

EXPOSE 5000