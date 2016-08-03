var companyList = angular.module('companyList', ['ngRoute']);

companyList.config(['$routeProvider', function($routeProvide) {
    $routeProvide
        .when('/',{
            templateUrl: 'templates/home.html',
            controller: 'CompanyListCtrl'
        })
        .when('/add-company',{
            templateUrl: 'templates/add-company.html',
            controller: 'AddCompanyCtrl'
        })
        .when('/company/:inn/:company/:leader', {
            templateUrl: 'templates/company-detail.html',
            controller: 'CompanyDetailCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

companyList.controller('MainCtrl', function($scope, $location, $http){
    $http.get('js/data.json').success(function(data){
        $scope.data = data;
    });
})

.controller('CompanyListCtrl', function($scope, $http, $location) {    

    $scope.removeCompany = function(idx) {
        if (confirm('Удалить компанию?')) {
            $scope.data.splice(idx, 1);
        }
    };

})

.controller('AddCompanyCtrl', function($scope, $location){
    $scope.addCompany = function() {
        console.log($scope);
        if ($scope.compName && $scope.compLeader && $scope.compInn) {
            $scope.data.push({
                inn:    $scope.compInn,
                company: $scope.compName,
                leader: $scope.compLeader
            });
            $scope.compName = $scope.compLeader = $scope.compInn = '';
        }
    };
});

companyList.controller('CompanyDetailCtrl', function($scope, $location, $routeParams){
    $scope.companyInfo = $routeParams;
});
