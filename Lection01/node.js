const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Запрос получен!');

    if (req.url === '/') {

        res.writeHead(200, {
            "content-type": "text/html; charset=UTF-8"
        });
    
        res.end('<h1>Добро пожаловать на мой сайт!</h1>');

    } else if (req.url === '/about') {
        
        res.writeHead(200, {
            "content-type": "text/html; charset=UTF-8"
        });
    
        res.end('<h1>about</h1>');

    } else {

        res.writeHead(404, {
            "content-type": "text/html; charset=UTF-8"
        });
    
        res.end('<h1>Not found</h1>');

    }

    
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});