const express = require('express')
const path = require('path')
const app = express()

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'))
})
app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'o-nas.html'))
})
app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'oferta.html'))
})
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'kontakt.html'))
})


app.post('/kontakt', (req, res) => {
    const { imie, nazwisko, email, wiadomosc } = req.body

    console.log('Dane z formularza:')
    console.log('Imię:', imie)
    console.log('Nazwisko:', nazwisko)
    console.log('Email:', email)
    console.log('Wiadomość:', wiadomosc)

    res.redirect('/')
});


app.use((req, res)=>{
    res.status(404).type('text/plain; charset=utf-8').send('404 - Nie znaleziono :(')
})
app.listen(3000, () => {
    console.log('Server jest na porcie http://localhost:3000 :)')
})