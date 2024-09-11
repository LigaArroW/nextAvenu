FROM node:20 AS base

# Устанавливаем рабочую директорию для приложения
WORKDIR /app

# Копируем package.json и package-lock.json из директории с сервером
COPY server_avenu/package.json server_avenu/package-lock.json ./

# Устанавливаем зависимости только для сервера
RUN npm install

# Копируем файлы для бэкенда
COPY server_avenu ./server_avenu

# Копируем остальные файлы, необходимые для сборки, исключая ненужные
COPY . .

# Выполняем сборку (если требуется, можно указать сборку фронтэнда отдельно)
RUN npm run build:all

# Указываем команду запуска сервера
CMD ["node", "server_avenu/server.js"]
