import fastify from 'fastify';
import path from 'path';
import cookie from '@fastify/cookie';
import session from '@fastify/session';
import staticPlugin from '@fastify/static';
import connection from './backend/db.js';
import userRoutes from './backend/user.js';
import fuelBracketsRoutes from './backend/fuelBrackets.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Отримуємо шлях до поточної директорії
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Створюємо екземпляр Fastify
const app = fastify({ logger: true });

// Додаємо плагін для роботи з куками
app.register(cookie);

// Додаємо плагін для сесій
app.register(session, {
  secret: 'd03c3f8f30a5e1d45576f3f8a1f87e989b19edcb9cdb4f430f1b5421cf0b306f',
  cookie: { secure: false }, // Для тестування на локальному сервері set 'secure' to false
  saveUninitialized: false, // Не зберігати сесію, якщо вона порожня
  resave: false, // Не зберігати сесію, якщо вона не змінюється
});

// Додаємо підключення до бази в Fastify
app.decorate('mysql', connection);

// Реєструємо маршрути користувачів
app.register(userRoutes);

// Реєструємо плагін для статичних файлів
app.register(staticPlugin, {
  root: path.join(__dirname),
  prefix: '/',
});

// Реєструємо маршрути для fuel_brackets
app.register(fuelBracketsRoutes);

// Маршрут для домашньої сторінки
app.get('/', async (request, reply) => {
  return reply.sendFile('/index.html');
});

// Запуск сервера
app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Сервер запущено на ${address}`);
});

// Закриття з'єднання при зупинці сервера
process.on('SIGINT', () => {
  connection.end((err) => {
    if (err) {
      console.error('Помилка закриття з\'єднання: ', err.stack);
    } else {
      console.log('З\'єднання з базою даних закрите');
    }
  });
});
