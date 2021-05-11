var db = require('mongoose')
var bcrypt = require('bcrypt')

db.connect('mongodb://localhost:27017/quanao', { useNewUrlParser: true, useUnifiedTopology: true })

var userScheme = db.Schema
    ({
        username: { type: String, unique: true, require: true },
        email:  {type:String ,unique:true, required : true},
        password: { type: String, require: true }
    })
userScheme.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted;
        next()
    })
})  


var User = module.exports = db.model('User', userScheme)