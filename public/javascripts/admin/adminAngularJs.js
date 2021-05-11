var app = angular.module("myApp", ["ngRoute"]);
app.controller('myCtrl', function ($scope) {

})

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/views/admin/home.html",
        })
        .when("/table", {
            templateUrl: "/views/admin/tables.html",
            controller:"tableCtrl"
        })
        .otherwise({
            templateUrl : "/views/admin/home.html"
          });
})
app.controller('tableCtrl',function($scope,$http){
    
  $http.get("/data").then(function (res) {
    $scope.items = res.data.products
    console.log( $scope.items)
  });
  
})