const express = require('express')
require('dotenv').config()


const app = express()

app.get('/', (req, res) => {
    console.log('Peticion recibida!');

    res.send('Hola mundo sin .env')
})


const PORT = process.env.PORT || 4000


app.listen(PORT, ()=>{
    console.log(`Corriendo en puerto:${PORT}`);
})