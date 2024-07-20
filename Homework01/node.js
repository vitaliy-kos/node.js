const http = require('http');

let countHome = 0,
    countAbout = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен!');
    
    if (req.url === '/') {
        countHome++;

        res.writeHead(200, {
            "content-type": "text/html; charset=UTF-8"
        });
    
        res.end(`<a href="/about">ссылка на about</a><br><p>Количество посещений: ${countHome}</p>`);

    } else if (req.url === '/about') {
        countAbout++;
        
        res.writeHead(200, {
            "content-type": "text/html; charset=UTF-8"
        });
    
        res.end(`<a href="/">ссылка на главную</a><br><p>Количество посещений: ${countAbout}</p>`);

    } else {

        res.writeHead(404, {
            "content-type": "text/html; charset=UTF-8"
        });
    
        res.end('<h1>404 Not found</h1><br><a href="/">ссылка на главную</a>');

    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});