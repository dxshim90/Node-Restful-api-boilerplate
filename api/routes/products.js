const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')



//url = /products

router.get('/', (req, res, next) => {
    Product.find().select('name price _id')
    .exec()
    .then(docs => {
       const response = {
           count: docs.length,
           products: docs.map(doc => {
               return {
                   name: doc.name,
                   price: doc.price,
                   _id: doc._id,
                   request: {
                       type: 'GET',
                       url: `http://localhost:3000/products/${doc._id}`
                   }
               }
           })
       }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err
        })
    })
})



router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Product Created',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/products/${result._id}`
            }
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })

    
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
   Product.findById(id).exec().then(doc => {
        const product = {
            name: doc.name,
            price: doc.price,
            _id: doc._id
        }
        if (!doc) {
            res.status(500).json({
                message: 'No Such Product',
            })
        }
        res.status(200).json(product)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:id', async (req, res, next) => {
    const id = req.params.id
   try {
       const newPro = {
           name: req.body.name,
           price: req.body.price
       }
        await Product.findByIdAndUpdate(
           {_id: id},
           {$set: newPro},
           {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            console.log(doc)
           res.json(doc)
           })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                error: err
       })
       console.log(updatedProduct)
    }})

router.delete('/:id', async (req, res, next) => {
        const id = req.params.id
        try {
           await Product.deleteOne({_id: id})
           res.status(500).json({
               message: 'Product Removed'
           })
           
        } catch (err) {
            res.status(500).json({
                error: err
            })
        }
    })



module.exports = router