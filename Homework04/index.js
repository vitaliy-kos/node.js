const express = require('express');
const { userSchema } = require('./validation/schema');
const { getUsersFromFile : getUsers, saveUsersFile: saveUsers } = require('./fileWorker/worker');

const app = express();

app.use(express.json());

/**
 * Получение всех пользователей
 */
app.get('/users', (req, res) => {
    const users = getUsers();
    res.send({ users: users });
});

/**
 * Получение пользователя по id
 */
app.get('/users/:id', (req, res) => {
    const users = getUsers();
    const user = users.find((user) => user.id === Number(req.params.id) );

    if (user) {
        res.send({ user });
    } else {
        res.status(404);
        res.send({
            user: null,
            message: "User not found"
        });
    }
});

/**
 * Создание пользователя
 */
app.post('/users', (req, res) => {
    const validateResult = userSchema.validate(req.body);

    if (validateResult.error) {
        return res.status(400).send({
            error: validateResult.error.details
        });
    }

    const users = getUsers();
    let maxId = users.reduce( (max, user) => (user.id > max ? user.id : max), users[0].id );
    
    maxId += 1;

    users.push({
        id: maxId,
        ...req.body
    });

    saveUsers(users);

    res.send({
        id: maxId
    });
});

/**
 * Обновление пользователя
 */
app.put('/users/:id', (req, res) => {
    const validateResult = userSchema.validate(req.body);

    if (validateResult.error) {
        return res.status(400).send({
            error: validateResult.error.details
        });
    }

    const users = getUsers();
    const user = users.find( (user) => user.id === Number(req.params.id) );

    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;

        saveUsers(users);

        res.send({ user: user });
    } else {
        res.status(404);
        res.send({
            user: null,
            message: "User not found"
        });
    }
});

/**
 * Удаление пользователя
 */
app.delete('/users/:id', (req, res) => {
    const users = getUsers();
    const userIndex = users.findIndex( (user) => user.id === Number(req.params.id) );

    if (userIndex > -1) {
        users.splice(userIndex, 1);
        saveUsers(users);
        res.send({ message: "Пользователь успешно удален." });
    } else {
        res.status(404);
        res.send({
            user: null,
            message: "User not found"
        });
    }
});

app.use((req, res) => {
    res.status(404).send({
        message: 'Url not found'
    });
});

const port = 3000;

app.listen(port, () => {
    console.log(`Серевер запущен на порту ${port}`);
});