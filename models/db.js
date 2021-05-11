var db = require('mongoose')
db.connect('mongodb://localhost:27017/quanao', { useNewUrlParser: true, useUnifiedTopology: true })

var productScheme = db.Schema
    ({
        images: Array,
        name: String,
        sku: String,
        price: Object,
        description: String,
        category:String,
        __v:Number
    })

var products = module.exports = db.model('products', productScheme)