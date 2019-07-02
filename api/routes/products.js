const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')



//url = /products

router.get('/', (req, res, next) => {
    Product.find().exec()
    .then(docs => {
        console.log(docs)
        res.status(200).json(docs)
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
        res.status(200).json({
            message: 'Handling POST Request to /products',
            createdProduct: product
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
        console.log(doc)
        if (!doc) {
            res.status(500).json({
                message: 'No Such Product'
            })
        }
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

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