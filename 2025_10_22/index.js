const express = require('express')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Strona główna!')
})
app.get('/json', (req, res) => {
    res.json({ Super: 'text' })
})
app.get('/html', (req, res) => {
    res.send('<h1>Super</h1><p> mega fajna przepiękna stronka</p>')
})
app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'file.html'))
})

app.get('/get_params', (req, res) => {
    console.log('Parametry:', req.query)
    let date = Date.now()
    const data = JSON.stringify(req.query, null, 2)
    fs.writeFile(`params_${date}.json`, data, (err) => {
        if (err) {
            res.send(err)
        }
        else{
            res.json(req.query)
        }
    })
})
app.use((req, res)=>{
    let fajnasciezka = path.join(__dirname, 'assets', req.path)

    fs.access(fajnasciezka, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).type('text/plain; charset=utf-8').send('404 - Nie znaleziono :(')
        }
        else{
            const mimeType = mime.lookup(fajnasciezka) || 'application/octet-stream'
            res.type(mimeType)
            res.sendFile(fajnasciezka)
        }
    })
})


app.use((req, res)=>{
    res.status(404).type('text/plain; charset=utf-8').send('404 - Nie znaleziono :(')
})
app.listen(3000, ()=>{
    console.log('Server jest na porcie http://localhost:3000 :)')
})