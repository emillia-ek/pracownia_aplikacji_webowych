const express = require('express')
const path = require('path')
const app = express()
const mysql = require('mysql')

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(express.urlencoded({ extended: true }))

//polaczenie mysql
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: '',
    database: 'dane4'
})
connection.connect()


//sciezki
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


//api
app.post('/kontakt', (req, res) => {
    const { imie, nazwisko, email, wiadomosc } = req.body

    console.log('Dane z formularza:')
    console.log('Imię:', imie)
    console.log('Nazwisko:', nazwisko)
    console.log('Email:', email)
    console.log('Wiadomość:', wiadomosc)

    connection.query(
        'insert into messages (name, surname, email, message) values (?, ?, ?, ?)',
        [imie, nazwisko, email, wiadomosc],
        (err, result) => {
            if (err) {
                return res.status(500).send('Błąd zapisu do bazy.')
            }

            res.redirect('/')
        }
    )
});
app.get('/api/contact-messages', (req, res) => {
    connection.query(
        'select * from messages',
        (err, result) => {
            if (err) {
                return res.status(500).send('Błąd zapisu do bazy.')
            }
            return res.status(200).json(result)
        }
    )
})
app.get('/api/contact-messages/:id', (req, res) => {
    connection.query(
        'select * from messages where id=?',
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).send('Błąd zapisu do bazy.')
            }
            if(result.length == 0) {
                return res.status(404).send('Nie znaleziono rekordu o podanym id')
            }

            return res.status(200).json(result)
        }
    )
})



app.use((req, res)=>{
    res.status(404).type('text/plain; charset=utf-8').send('404 - Nie znaleziono :(')
})
app.listen(3000, () => {
    console.log('Server jest na porcie http://localhost:3000 :)')
})