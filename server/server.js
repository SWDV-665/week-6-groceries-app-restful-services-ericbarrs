const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose
const PORT = 5000


const app = express()

app.use(express.json())

const DB = 'mongodb://localhost:27017/Groceries'

mongoose
.connect(DB, { useNewUrlParser: true }, { useUnifiedTopology: true })
.then(()=> console.log('db connected'))
.catch(err => console.log(err))

const itemSchema = new Schema({
    name: String,
    quantity: Number
})

mongoose.model('items', itemSchema)



app.get('/items', async (req,res) => {
    const result = await mongoose.model('items').find({})
    res.json(result)
})

app.post('/items', async (req,res) => {
    const {name, quantity } = req.body
    const newItem = {
        name,
        quantity
    }
    await mongoose.model('items').save(newItem).then((data)=> res.json(data))
})

app.listen(PORT, (err) =>{
    if(err) console.log(err)
    else console.log(`Working on port ${PORT}`)
})