import fastify from 'fastify';

export default async function (fastify, options) {
    
    // Маршрут для отримання всіх записів
    fastify.get('/fuel_brackets', async (request, reply) => {
        try {
            const [results] = await fastify.mysql.promise().query('SELECT * FROM fuel_brackets');
            reply.send(results);
        } catch (err) {
            console.error('Помилка запиту до fuel_brackets: ', err.stack);
            return reply.code(500).send({ message: 'Помилка запиту до бази даних' });
        }
    });

    // Маршрут для оновлення даних товару
    fastify.put('/fuel_brackets/:id', async (request, reply) => {
        const { id } = request.params;  // Отримуємо ID товару з параметрів
        const updatedData = request.body;  // Отримуємо оновлені дані з тіла запиту

        console.log('Оновлення товару:', updatedData);

        try {
            const query = 'UPDATE fuel_brackets SET fuel_type = ?, calorific_value = ?, price = ?, supplier = ?, availability = ?, created_at = ?, image_url = ? WHERE id = ?';
            const values = [
                updatedData.fuel_type,
                updatedData.calorific_value,
                updatedData.price,
                updatedData.supplier,
                updatedData.availability,
                updatedData.created_at,
                updatedData.image_url,
                id
            ];

            const [result] = await fastify.mysql.promise().query(query, values);

            console.log('Результат запиту:', result);

            if (result.affectedRows === 0) {
                return reply.status(404).send({ message: 'Товар не знайдений' });
            }

            return reply.status(200).send({ message: 'Товар оновлено успішно' });
        } catch (error) {
            console.error('Помилка при оновленні товару:', error);
            return reply.status(500).send({ message: 'Виникла помилка при оновленні товару' });
        }
    });

    // Маршрут для видалення товару
    fastify.delete('/fuel_brackets/:id', async (request, reply) => {
        const { id } = request.params;  // Отримуємо ID товару з параметрів
        console.log('Запит на видалення товару з ID:', id);  // Додано для логування
    
        try {
            const query = 'DELETE FROM fuel_brackets WHERE id = ?';
            const values = [id];
    
            const [result] = await fastify.mysql.promise().query(query, values);
    
            console.log('Результат запиту:', result);  // Додано для перевірки результату
    
            if (result.affectedRows === 0) {
                return reply.status(404).send({ message: 'Товар не знайдений' });
            }
    
            return reply.status(200).send({ message: 'Товар успішно видалено' });
        } catch (error) {
            console.error('Помилка при видаленні товару:', error);
            return reply.status(500).send({ message: 'Виникла помилка при видаленні товару' });
        }
    });
    
    fastify.post('/fuel_brackets', async (request, reply) => {
        const newProduct = request.body;  // Отримуємо дані нового товару з тіла запиту
    
        console.log('Запит на додавання нового товару:', newProduct);  // Логування
    
        try {
            const query = `INSERT INTO fuel_brackets (fuel_type, calorific_value, price, supplier, availability, created_at, image_url) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                newProduct.fuel_type,
                newProduct.calorific_value,
                newProduct.price,
                newProduct.supplier,
                newProduct.availability,
                newProduct.created_at,
                newProduct.image_url
            ];

            const [result] = await fastify.mysql.promise().query(query, values);

            console.log('Результат запиту:', result);  // Логування результату запиту

            if (result.affectedRows === 0) {
                return reply.status(400).send({ message: 'Не вдалося додати товар' });
            }

            return reply.status(201).send({ message: 'Товар успішно додано' });
        } catch (error) {
            console.error('Помилка при додаванні товару:', error);
            return reply.status(500).send({ message: 'Виникла помилка при додаванні товару' });
        }
    });
};
