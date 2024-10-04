FROM node:20.1.0-alpine3.17 as Base

WORKDIR /app

COPY package.json .

COPY pnpm-lock.yaml .

RUN npm i -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

RUN pnpm build

CMD [ "pnpm", "start:dev" ]