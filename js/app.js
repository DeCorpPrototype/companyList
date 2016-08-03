var companyList = angular.module('companyList', ['ngRoute','ngDialog']);

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

.controller('CompanyListCtrl', function($scope, $http, $location, ngDialog) {

    $scope.removeCompany = function(idx) {
            $scope.data.splice(idx, 1);
    };

    $scope.clickToOpen = function (company, index) {
        $scope.comp = company;
        $scope.idx = index;
        ngDialog.open({
            template: 'templates/modalTemplate.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
            controller: 'CompanyListCtrl'
        });
    };

    $scope.editCompany = function() {
        $scope.data[$scope.idx].company = $scope.editName;
        $scope.data[$scope.idx].leader = $scope.editLeader;
        $scope.data[$scope.idx].inn = $scope.editInn;
    };

})

.controller('AddCompanyCtrl', function($scope, $location){
    $scope.addCompany = function() {
        if ($scope.compName && $scope.compLeader && $scope.compInn) {
            $scope.data.push({
                inn:    $scope.compInn,
                company: $scope.compName,
                leader: $scope.compLeader
            });
            $scope.compName = $scope.compLeader = $scope.compInn = '';
            alert('Компания добавлена');
        }

        $("#inputLeader").suggestions({
            serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
            token: "4c6c92f7a561543cbb0ca7c15dffda25b4a5137c",
            type: "NAME",
            count: 5,
            /* Вызывается, когда пользователь выбирает одну из подсказок */
            onSelect: function(suggestion) {
                console.log(suggestion);
            }
        });
        $("#inputName").suggestions({
            serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
            token: "4c6c92f7a561543cbb0ca7c15dffda25b4a5137c",
            type: "PARTY",
            count: 5,
            /* Вызывается, когда пользователь выбирает одну из подсказок */
            onSelect: function(suggestion) {
                console.log(suggestion);
            }
        });
        $("#inputLeader").suggestions({
            serviceUrl: "https://suggestions.dadata.ru/suggestions/api/4_1/rs",
            token: "4c6c92f7a561543cbb0ca7c15dffda25b4a5137c",
            type: "NAME",
            count: 5,
            /* Вызывается, когда пользователь выбирает одну из подсказок */
            onSelect: function(suggestion) {
                console.log(suggestion);
            }
        });
    };
})

.controller('CompanyDetailCtrl', function($scope, $location, $routeParams){
    $scope.companyInfo = $routeParams;
});
