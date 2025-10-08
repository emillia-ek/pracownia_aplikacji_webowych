const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if(parsedUrl.pathname === "/"){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end("Strona glowna!")
    }
    else if (parsedUrl.pathname === '/get_params') {
        let timestamp = Date.now();
        console.log('Parametry:', parsedUrl.query);
        let params = parsedUrl.query;
        let json = JSON.stringify(params);
        //console.log(json);
        fs.writeFile(`params_${timestamp}.json`, json, (err) => {
            if (err) {
                console.error('Nie mozna zapisac pliku:', err);
                return;
            }
            console.log('Plik zostal zapisany!');
        });

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Parametry sa w konsoli!');
    }
});
server.listen(3000, () => {
    console.log('Serwer jest na http://localhost:3000');
});