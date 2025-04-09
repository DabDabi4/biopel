import mysql from 'mysql2';

// Створюємо з'єднання з базою даних
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'biopel' // Вкажіть назву вашої бази даних
});

// Перевірка з'єднання
connection.connect((err) => {
  if (err) {
    console.error('Помилка підключення до бази даних: ', err.stack);
    return;
  }
  console.log('Підключення до бази даних встановлено');
});

// Обробник сигналу завершення (Ctrl + C)
process.on('SIGINT', () => {
  console.log("Зупинка сервера...");
  if (connection && connection.state !== 'disconnected') {
    connection.end((err) => {
      if (err) {
        console.error('Помилка закриття з\'єднання: ', err.stack);
      } else {
        console.log('З\'єднання з базою даних закрите');
      }
    });
  }
  process.exit(0); // Завершуємо процес після закриття з'єднання
});

// Експортуємо з'єднання для використання в інших файлах
export default connection;
