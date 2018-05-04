FROM node:8-alpine

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

RUN mkdir -p /public

RUN apk add --no-cache git

RUN npm install

ENV NODE_ENV production

RUN npm run build

RUN npm prune --production

CMD npm start -- /public

EXPOSE 5000
