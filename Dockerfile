FROM node:8.10.0-alpine

RUN mkdir -p /public

ENV NODE_ENV production

RUN apk add --no-cache git

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

RUN npm install --only=prod
RUN npm install --only=dev

RUN npm run build

CMD npm start -- /public

EXPOSE 5000
