var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when("/about", {templateUrl: "others/about.html"})
    // .when("/courses/:courseId/:courseName", {templateUrl: "quizz/quizz-start.html", controller: "QuizzController"})
    .when("/login", {templateUrl: 'auth/login.html', controller:"LoginController"})
    .when("/register", {templateUrl: 'auth/register.html', controller:"RegisterController"})
    .when("/update-password", {templateUrl: 'auth/update-password.html', controller:"UpdatePasswordController"})
    .when("/update-profile", {templateUrl: 'auth/update-profile.html', controller: "UpdateProfileController"})
    .when("/courses/:courseId/:courseName", {templateUrl: "quizz/quiz.html", controller: "QuizzController"})
    .otherwise({templateUrl: "course-cat.html",
                controller: "CourseController"});
})
.controller('IndexController', function($scope, $rootScope, $location, $http){
    var url = '../db/Students.json';
    $http.get(url).then(function (response) {
        $scope.users = response.data;
    },
    function () {
        console.log('Error in Get Users');
    });
    // sessionStorage.removeItem('user');
    //   Kiểm tra user login
    $scope.checkLogin = function(){
        console.log('checkLogin in indexctrl called');
        var user = JSON.parse(sessionStorage.getItem('user'));
        if(user != null) {
            $scope.user = user;
            $scope.user.birthday = new Date(user.birthday);
            $scope.isLogin = true;
        };
    }
    $scope.checkLogin();
    
    $scope.logout = function(){
        console.log('Logging out');
        sessionStorage.removeItem('user');
        $scope.user = undefined;
        $scope.isLogin = false;
    };
    
    //Set location for $scope to get url in html
    $scope.$location = $location;
    $scope.searchKeyword = '';
    
});