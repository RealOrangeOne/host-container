FROM node:8-alpine

RUN mkdir -p /public

COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./tsconfig.json /app/tsconfig.json

WORKDIR /app

RUN npm install

RUN npm run build

CMD npm start -- /public

EXPOSE 5000
