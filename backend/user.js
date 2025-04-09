import fastify from 'fastify';

export default async function (fastify, options) {

    // Отримання всіх користувачів
    fastify.get('/users', async (request, reply) => {
        try {
            const [results] = await fastify.mysql.promise().query('SELECT * FROM users');
            reply.send(results);
        } catch (err) {
            console.error('Помилка запиту: ', err.stack);
            return reply.code(500).send({ message: 'Помилка запиту до бази даних' });
        }
    });

    // Маршрут для видалення користувача
    fastify.delete('/users/:id', async (request, reply) => {
        const { id } = request.params;

        try {
            // Перевірка, чи користувач з таким ID існує
            const [user] = await fastify.mysql.promise().query('SELECT * FROM users WHERE id = ?', [id]);

            if (user.length === 0) {
                return reply.code(404).send({ error: 'Користувача не знайдено' });
            }

            // Видалення користувача з бази даних
            await fastify.mysql.promise().query('DELETE FROM users WHERE id = ?', [id]);

            return reply.send({ message: 'Користувача успішно видалено' });
        } catch (err) {
            console.error('Помилка при видаленні користувача: ', err.stack);
            return reply.code(500).send({ error: 'Сталася помилка при видаленні користувача' });
        }
    });

    // Реєстрація нового користувача
    fastify.post('/register', async (request, reply) => {
        const { username, email, password } = request.body;

        try {
            // Перевірка на унікальність email
            const [existingUser] = await fastify.mysql.promise().query('SELECT * FROM users WHERE email = ?', [email]);

            if (existingUser.length > 0) {
                return reply.code(400).send({ error: 'Цей email вже зареєстрований' });
            }

            // Додавання користувача в базу даних
            await fastify.mysql.promise().query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);

            return reply.send({ message: 'Користувача успішно зареєстровано!' });
        } catch (err) {
            console.error('Помилка при реєстрації: ', err.stack);
            return reply.code(500).send({ error: 'Сталася помилка при реєстрації' });
        }
    });

    // Маршрут для авторизації
    fastify.post('/login', async (request, reply) => {
        const { email, password } = request.body;
    
        try {
            const [results] = await fastify.mysql.promise().query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
            if (results.length > 0) {
                const user = results[0];
                request.session.userId = user.id;
    
                // Повертаємо користувача з роллю
                return reply.send({
                    message: 'Авторизація успішна!',
                    user: { id: user.id, username: user.username, role: user.role } // Включаємо роль
                });
            } else {
                return reply.code(401).send({ error: 'Невірний email або пароль' });
            }
        } catch (err) {
            console.error('Помилка при авторизації:', err.stack);
            return reply.code(500).send({ error: 'Сталася помилка при авторизації' });
        }
    });
    
    // Маршрут для отримання поточного користувача
    fastify.get('/current-user', async (request, reply) => {
        try {
            if (!request.session.userId) {
                return reply.code(401).send({ error: 'Користувач не авторизований' });
            }

            // Отримуємо дані користувача за ID з сесії
            const [results] = await fastify.mysql.promise().query('SELECT * FROM users WHERE id = ?', [request.session.userId]);

            if (results.length > 0) {
                return reply.send(results[0]); // Повертаємо дані поточного користувача
            } else {
                return reply.code(404).send({ error: 'Користувач не знайдений' });
            }
        } catch (err) {
            console.error('Помилка при отриманні поточного користувача: ', err.stack);
            return reply.code(500).send({ error: 'Сталася помилка' });
        }
    });
}
