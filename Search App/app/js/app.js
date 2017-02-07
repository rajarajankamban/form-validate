var app = angular.module('iAmHungryApp',[]);

app.controller('hungryList',['$scope','$http',function($scope,$http){
  $scope.title = "Check this";
  
  var getResturantDetails = function(response){
    $scope.resturantList = response.data;
  }
  var onError = function(response){
    $scope.error = "could not fetch the user";
  }
  
  $http.get("app/data/resturantFoodDetails.json").then(getResturantDetails, onError);
  console.log($scope.resturantList );
  
}]);



