var app = angular.module("hacekerApp",[]);

app.controller("challengeController",['$scope','$http',function($scope,$http){
  $http.get("https://hackerearth.0x10.info/api/problems?type=json&query=list_problems").then(function(response) {
      $scope.challengeData = response.data.problems;
    console.log($scope.challengeData);
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
app.controller("testController",['$scope',function($scope){
  $scope.persons = [{name:'jon',amount:'10',gender:'male'},{name:'ram',amount:'110',gender:'male'}]
  $scope.addPerson = function(){
    var val = {name:$scope.person.name, amount:$scope.person.amount, gender:$scope.person.gender};
    $scope.persons.push(val);
  }

}]);