var app = angular.module("myApp", ["ngRoute"]);
app.controller('myCtrl', ($scope, $http) => {
  $scope.brand = "Jensen"
  $scope.home = "Home"
  $scope.listCart = []
  //add to card function
  $scope.addtoCart = function (item) {
    if ($scope.listCart.length === 0) {
      item.soluong = 1;
      $scope.listCart.push(item);
      console.log(' sản phẩm đầu tiên!')
    } else {
      var repeat = false;
      for (var i = 0; i < $scope.listCart.length; i++) {
        if ($scope.listCart[i]._id === item._id) {
          repeat = true;
          $scope.listCart[i].soluong += 1;
          console.log(' sản phẩm trùng số lượng cộng thêm 1 là:' + $scope.listCart[i].soluong)
        }
      }
      if (!repeat) {
        item.soluong = 1;
        $scope.listCart.push(item);
        console.log('sản phẩm mới')
      }
    }

  }
  // return $scope.listCart
  //add to card function end

  $scope.random = function () {
    return 0.5 - Math.random();
  };
  $scope.productPortfolio = [

    {
      collections:
        [
          { name: "Áo", chitiet: [{ "Crop Top 1": "allproduct/shirt" }, { "Thun": "allproduct/shirt" }, { "Sơ mi": "allproduct/shirt" }, { "Bẹt Vai": "allproduct/shirt" }, { "Áo khoác": "allproduct/shirt" }, { "Kiểu": "allproduct/shirt" }], img: "http://theme.hstatic.net/200000000131/1000678796/14/menuitem_featured_image_1_1.jpg?v=263" },
          { name: "Váy", chitiet: [{ "Chữ A": "allproduct/dress" }, { "Ôm": "allproduct/dress" }], img: "//theme.hstatic.net/200000000131/1000678796/14/menuitem_featured_image_3_1.jpg?v=263" },
          { name: "Đầm", chitiet: [{ "Chữ A": "allproduct/dress2" }, { "Ôm": "allproduct/dress2" }, { "Thun": "allproduct/dress2" }, { "Sơ mi": "allproduct/dress2" }, { "Suông": "allproduct/dress2" }], img: "http://theme.hstatic.net/200000000131/1000678796/14/menuitem_featured_image_5_1.jpg?v=263" },
          { name: "Quần", chitiet: [{ "Quần dài": "allproduct/pant" }, { "Quần short": "allproduct/pant" }], img: "http://theme.hstatic.net/200000000131/1000678796/14/menuitem_featured_image_4_1.jpg?v=263" }
        ]
    }
  ]

  $http.get("/data").then(function (res) {
    $scope.products = res.data.products
  });
});
app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/views/home.html",
      // controller: "addCart"
    })

    .when("/chitiet/:id", {
      templateUrl: "/views/chitietsanpham.html",
      controller: "productCtrl"


    })

    .when("/cart", {
      templateUrl: "/views/shopping-cart.html",
      controller: "cartCtrl",

    })
    .when("/allproduct/:all_product", {
      templateUrl: "/views/all_product.html",
      controller: "allproductCtrl",


    })
    .when("/searchPage", {
      templateUrl: "/views/search.html",
      controller: "searchCtrl"
    })
    .otherwise({
      templateUrl: "/views/index.html"
    });
})
// app.controller('addtoCart',function($scope, $rootScope, $routeParams, $http){
//   $http.get("/addtoCart/")
//     .then((res) => {
//       $scope.listCart = res.data.listCart;
//     })
// })
app.controller('searchCtrl', function ($scope, $rootScope) {
  $rootScope.products
  $scope.order = ''
  // $scope.addtoCart = function (item) {
  //   $scope.listCart.push(item);
  // }
});

// app.controller('addCart', function ($scope) {
//   $scope.addtoCart = function (item) {
//     if ($scope.listCart.length === 0) {
//       item.soluong = 1;
//       $scope.listCart.push(item);
//       console.log(' sản phẩm đầu tiên!')

//     } else {
//       var repeat = false;
//       for (var i = 0; i < $scope.listCart.length; i++) {
//         if ($scope.listCart[i]._id === item._id) {
//           repeat = true;
//           $scope.listCart[i].soluong += 1;
//           console.log(' sản phẩm trùng số lượng cộng thêm 1 là:' + $scope.listCart[i].soluong)
//         }
//       }
//       if (!repeat) {
//         item.soluong = 1;
//         $scope.listCart.push(item);
//         console.log('sản phẩm mới')
//       }
//     }

//   }
//   return $scope.listCart

// })

app.controller('productCtrl', function ($scope, $rootScope, $routeParams, $http) {
  $scope.ramdom = function () {
    return 0.5 - Math.random();
  };
  $scope.ramdom()
  $rootScope.products
  $scope.id = $routeParams.id
  $scope.randNumber = Math.floor(Math.random() * 100);
  $http.get("/chitiet/" + $scope.id)
    .then((res) => {  
      $scope.productx = res.data.product;
      $scope.category = $scope.productx.category
      console.log($scope.category);
      // $scope.ramdom()
      // console.log($scope.productx);
    })

  // $scope.addtoCart = function (productx) {
  //   $scope.listCart.push(productx);
  // }
  $scope.category
  $scope.sizes = ["M", "L", "XL", "XXL"]

  
  return $scope.productx
})
app.controller('allproductCtrl', function ($scope, $rootScope, $routeParams, $http) {
  let categorystr = $routeParams.all_product
  let category = '';
  switch (categorystr) {
    case 'pant':
      category = 'Quần';
      break;
    case 'dress':
      category = 'Váy';
      break;
    case 'dress2':
      category = 'Đầm';
      break;
    case 'shirt':
      category = 'Áo';
      break;
  }
  $scope.cgy = category;
  $rootScope.products
  // $scope.addtoCart = function (item) {
  //   $scope.listCart.push(item);
  // }
})
app.controller('tinhCtrl', function ($scope) {
  $scope.tinhsp = () => {
    return $scope.item.total = $scope.item.soluong * $scope.replaceStr($scope.item.price.sale)
  }
  $scope.tinhsp()
  $scope.tangsp = () => {
    if (parseInt($scope.item.soluong) < 20) {
      $scope.item.soluong += 1
      $scope.tinhsp()
    }

  }
  $scope.giamsp = () => {
    if (parseInt($scope.item.soluong) > 1) {
      $scope.item.soluong -= 1
      $scope.tinhsp()
    }

  }

})
app.controller('cartCtrl', function ($scope, $rootScope, $routeParams,$route) {
  $scope.id = $routeParams.id
  $rootScope.listCart

  var giohang = () => {
    if ($scope.listCart.length === 0) {
      $scope.thongbao = "Bạn chưa có gì trong giỏ hàng cả :>"
      $(".table").hide();
      $("#do_action").hide();
    } else {
      $scope.thongbao = ""
      $(".table").show();
      $("#do_action").show();
    }
  }
  giohang()
  // someData is the data you received from database.
  // angular.forEach($rootScope.LISTCART, function(key,value){
  //   $scope.listCart.push({value});
  // });
  // console.log($rootScope.LISTCART)
  //
  // $scope.soluong = 

  $scope.subtotal = () => {
    let total = 0;
    $scope.listCart.forEach((item) => {
      total += item.total;
    });
    return total;
  };
  $scope.removeItemCart = (item) => {
    var index = $scope.listCart.indexOf(item);
    $scope.listCart.splice(index, 1);
    giohang()
    return $scope.listCart
  };
  
  $scope.replaceStr = function (x) {
    let newString = x.replace(/,/g, "");
    let String2 = newString.replace(/₫/g, "");
    return newString = parseInt(String2)
  };
  $scope.checkout = function(){
    $scope.listCart = []
    $rootScope.listCart = []
    // $route.reload()
    giohang()
    // location.reload()
  }
})


