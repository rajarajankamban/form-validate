var app = angular.module('iAmHungryApp',[]);

app.controller('hungryList',['$scope','$http',function($scope,$http){
  $scope.title = "Check this";

  
  $http.get("app/data/resturantFoodDetails.json").then(function(response) {
     $scope.resturantList = response.data.restaurants;
    console.log($scope.resturantList);
    });
  
}]);



