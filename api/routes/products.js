const express = require('express')
const router = express.Router()



//url = /products

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET Request to /products'
    })
})



router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST Request to /products'
    })
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id === 'special') {
        res.status(200).json({
            message: 'You Discovered The Special ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'you passed an id'
        })
    }
})

router.patch('/:id', (req, res, next) => {
res.status(200).json({
    message: 'Updated Product'
})
})

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'product Deleted'
    })
    })



module.exports = router