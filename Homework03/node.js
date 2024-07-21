const express = require('express');
const fs = require('fs');

const app = express();

function getFile() {
    return JSON.parse(
        fs.readFileSync('./views.json', 'utf-8', (err) => {
            if (err) throw new Error('Error while reading file!');
        })
    );
}

function saveFile(data) {
    fs.writeFileSync('./views.json', data, (err) => {
        if (err) throw new Error('Error while writing file!');
    }); 
}

function getViews(url) {
    const data = getFile();
    return data[url];
}

function setViews(url, val) {
    const data = getFile();
    data[url] = val;
    saveFile(JSON.stringify(data));
}

app.get('/', (req, res) => {
    setViews(req.url, getViews(req.url)+1);

    res.send(`<h1>Добро пожаловать на мой сайт!<h1><br><br><a href="/about">ссылка на about</a><br><br><p>Количество посещений: ${getViews(req.url)}</p>`);
});

app.get('/about', (req, res) => {
    setViews(req.url, getViews(req.url)+1);

    res.send(`<h1>Страница обо мне!<h1><br><br><a href="/">ссылка на главную</a><br><br><p>Количество посещений: ${getViews(req.url)}</p>`);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Серевер запущен на порту ${port}`);
});