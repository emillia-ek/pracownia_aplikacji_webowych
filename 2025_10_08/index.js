const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === "/") {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("Strona glowna!");
    } else if (parsedUrl.pathname === '/get_params') {
        const timestamp = Date.now();
        const params = parsedUrl.query;

        console.log('Parametry GET:', params);

        const json = JSON.stringify(params, null, 2);

        fs.writeFile(`params_${timestamp}.json`, json, (err) => {
            if (err) {
                console.error('Nie mozna zapisac pliku:', err);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ error: 'Nie mozna zapisac pliku' }));
                return;
            }
            console.log('Plik zostal zapisany!');

            // Zwracamy JSON {"ok":"ok"}
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ ok: 'ok' }));
        });

    } else if (parsedUrl.pathname === "/json") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        const kot = { rasa: "syberyjski", wiek: 15 };
        res.end(JSON.stringify({ kot }, null, 2));
    } else if (parsedUrl.pathname === "/html") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        const html = "<h1>HTML</h1><p> to nie język programowania</p>";
        res.end(html);
    } else if (parsedUrl.pathname === "/file") {
        const filePath = path.join(__dirname, "file.html");
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end("Błąd odczytu pliku");
            } else {
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                res.end(data);
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end("404 - Nie znaleziono");
    }
});

server.listen(3000, () => {
    console.log('Serwer jest na http://localhost:3000');
});
