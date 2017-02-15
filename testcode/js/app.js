var app = angular.module("hacekerApp",[]);

app.controller("challengeController",['$scope','$http',function($scope,$http){
  $http.get("https://hackerearth.0x10.info/api/problems?type=json&query=list_problems").then(function(response) {
      $scope.challengeData = response.data.problems;
    });
  
  $scope.getNumber = function(num) {
    arr = new Array();
    for(var i=1;i<=num;i++){
      arr.push(i);
    }
    return arr;   
}
}]);
 /*ng-repeat="c in cdetails"*/
