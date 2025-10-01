let http = require('http')
let fs = require('fs');
let path = require('path');

http.createServer(function (req, res) {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end("Strona główna!")
    }
    else if (req.url === "/json") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" })
        const kot = {
            rasa: "syberyjski",
            wiek: 15
        }
        res.end(JSON.stringify({ kot }, null, 2))
    }
    else if (req.url === "/html") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        const html = "<h1>HTML</h1><p> to nie język programowania</p>"
        res.end(html);
    }
    else if (req.url === "/file") {
        let filePath = path.join(__dirname, "file.html")
        fs.readFile(filePath, (err, data)=> {
            if(err){
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
                res.end(err)
            }
            else{
                res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
                res.end(data)
            }
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end("404 - Nie znaleziono")
    }
}).listen(8080)
