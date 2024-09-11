FROM node:20 AS base
FROM base AS deps
WORKDIR /app
COPY package.json .
RUN npm install
COPY .. .
RUN npm run build:all
CMD ["node", "server.js"]
