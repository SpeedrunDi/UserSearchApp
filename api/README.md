# User Search App - Backend

## Описание
Это серверная часть приложения для поиска пользователей. Сервер написан на Node.js с использованием Express.js и TypeScript.

## Установка

1. Клонируйте репозиторий:
    ```bash
    git clone <repository-url>
    ```

2. Перейдите в директорию проекта:
    ```bash
    cd api
    ```

3. Установите зависимости:
    ```bash
    npm install
    ```

## Запуск

1. Запустите сервер:
    ```bash
    npm run start
    ```

2. Сервер будет запущен на http://localhost:3001.

## Структура проекта

- `src/index.ts` - основной файл сервера.
- `users.json` - файл с данными пользователей.

## Валидация

- Email проверяется на корректный формат.
- Number проверяется на формат (должен состоять из 6 цифр).

## Примечание

Сервер имеет искусственную задержку в 5 секунд для имитации долгой обработки запроса.
