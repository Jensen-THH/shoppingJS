var express = require('express');
var router = express.Router();
var Product = require('../models/db.js')
var sp = require('../models/db.js')

var User = require('../models/useradmin.js')

// user login
var bcrypt = require('bcrypt');
router.get('*', function (req, res, next) {
  res.locals.userId = req.session.userId;
  next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
//session kiểm tra xem có đăng nhập chưa đăng nhập r mới cho vào admin
router.get('/admin', function (req, res, next) {
  
  if (req.session.userId) {
    return res.render('admin/admin');
  }
  res.redirect('/login');
});

router.get('/data', function (req, res, next) {
  Product.find({}, (error, products) => {
    res.json({ products })
  })
});

router.get('/chitiet/:id', async function (req, res, next) {
  let id = req.params.id
  let product = await sp.findOne({ _id: id });
  res.json({ product });
});
function kiemtrahople(req, res, next) {
  if (!req.body.nameUser || !req.body.emailUser || !req.body.passwordUser) {
    res.redirect('/register')
  }
  else
    next();
}
// router.get('/register', function (req, res, next) {
//   res.render('admin/register');
// });
router.get('/login', function (req, res, next) {
  res.render('admin/loginadmin')
});
router.get('/logout', function (req, res, next) {
  req.session.userId = undefined
  res.redirect('/')
 });

router.get('/admin', function (req, res, next) {
  res.render('admin/admin')
});
// user register
// router.post('/register', kiemtrahople, function (req, res, next) {
//   var nguoidung = new User({
//     username: req.body.nameUser,
//     email: req.body.emailUser,
//     password: req.body.passwordUser
//   })
//   nguoidung.save(error => {
//     if (error)
//       return res.redirect('/register')
//     res.redirect('/login')
//   })
// });

router.post('/login', function (req, res, next) {
  var { nameUser, passwordUser } = req.body;
  console.log("chuan bi tim ... ")
  User.findOne({ username: nameUser }, (error, useradmin) => {
    console.log("dang tim...")
    if (useradmin) {
      bcrypt.compare(passwordUser, useradmin.password, (error, same) => {
        if (same) {
          req.session.userId = useradmin._id
          res.redirect('/admin')
          console.log("log in ")
        }
        else{
          res.redirect('/login')
        console.log("login false ")
      }
      })
    }
    else
      res.redirect('/login')
  })
})

// let listCart = [];
// router.get('/addtoCart/:id', async function(req, res, next) {
//   let id=req.params.id
//   let product = await sp.findOne({_id:id});
//   listCart.push(product)
//   res.json({listCart});
// });


// router.get('/chitietsp', function(req, res, next) {
//   res.render('chitietsanpham');
// });


module.exports = router;
