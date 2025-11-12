const express = require("express");

const app = express()
app.listen(3000, () => {
    console.log('Server jest na porcie http://localhost:3000 :)')
})