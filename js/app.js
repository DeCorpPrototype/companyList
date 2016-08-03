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

companyList.controller('CompanyListCtrl', function($scope, $http, $location) {

    $http.get('js/data.json').success(function(data){
        $scope.data = data;
    });

    $scope.removeCompany = function(idx) {
        if (confirm('Удалить компанию?')) {
            $scope.data.splice(idx, 1);
        }
    };

});

companyList.controller('AddCompanyCtrl', function($scope, $location){

});

companyList.controller('CompanyDetailCtrl', function($scope, $location, $routeParams){
    $scope.companyInfo = $routeParams;
});
