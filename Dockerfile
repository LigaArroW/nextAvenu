FROM node:20 AS base
WORKDIR /app
COPY server_avenu/package.json server_avenu/package-lock.json ./
RUN npm install
COPY server_avenu ./server_avenu
COPY . .
CMD ["node", "server_avenu/server.js"]
