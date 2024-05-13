const { timeStamp } = require('console')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()


const app = express()

mongoose.connect(`mongodb+srv://ccortes:${process.env.MONGO_DB_PASSWORD}@cluster0.oryyc2u.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then((result) => {

    app.listen(PORT, ()=>{
        console.log(`Corriendo en puerto:${PORT}`);
    })
    console.log('Conexion exitosa a la base de datos!');
})
.catch((err) => {
    console.log(err);
});
//SCHEMA DE BASE DE DATOS
const productSchema = mongoose.Schema({
    name:{type: String, required: true },
    price:{type: Number, required: true },
},
{timestamps: true}
)
//MODELO
const Product = mongoose.model('Product', productSchema)


app.use(express.json())



app.post('/api/v1/products', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    newProduct.save()
    .then(result => {
        res.status(201).json({ok: true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    });
});


app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000

