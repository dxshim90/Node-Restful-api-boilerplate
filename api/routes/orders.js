const express = require('express')
const router = express.Router()


// url = /orders

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Getting all the orders'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity

    }
    res.status(200).json({
        message: 'Order was created',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Details',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId
    })
})


module.exports = router
