const express = require('express')
const ProductManager = require('./ProductManager.js')
const manager = new ProductManager('./productsList.json')

const app = express()
app.use(express.json())

app.get('/', (req,res)=>{
    res.status(200).send('<h1 style="color:blue">Hola Mundo!!!</h1>')
})

app.get('/products', async(req,res) =>{
    const products = manager.getProducts()
    const limit = +req.query.limit
    if(!limit){
        res.status(200).send({products})
    }else{
        res.status(200).send(products.slice(0,limit));
    }
})

app.get('/products/:pid', (req, res) => {
    const id = Number(req.params.pid);
    const product = manager.getProductById(id);

    if(product) {
        res.status(200).send({product});
    } else {
        res.status(404).send({ message: 'Producto no encontrado' });
    }
})

app.listen(8080,()=>console.log('Server Up'))