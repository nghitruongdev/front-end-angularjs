app.controller('CourseController', function($http, $scope, $location){
    var url = '../db/Subjects.js';
    $scope.start = 0;
    $scope.pageSize = 4;
    $scope.currentPage = 1;
    $scope.courses = [];
    $scope.pages = [];

    $scope.getPages = function(){
        for (let index = 1; index <= $scope.getTotalPage(); index++) {
            if(index == 1){
                $scope.pages[index - 1] = [index, index + 1, index + 2];
            }else if(index == $scope.getTotalPage()){
                $scope.pages[index - 1] = [index - 2, index - 1, index];
        
            }else
            $scope.pages[index - 1] = [index - 1, index, index + 1];
           }
//    console.log($scope.pages);
    }
    $http.get(url).then(function(response){
        $scope.courses = response.data;
        $scope.getPages();
    });


    $scope.next = function(isNext){
        if(isNext && $scope.start < $scope.courses.length - 1){
            $scope.start += $scope.pageSize;
            console.log($scope.start);
            console.log($scope.courses.length);
            return;
        }

        if(!isNext && $scope.start > 0){
            $scope.start -= $scope.pageSize;
            return;
        }
    }

    $scope.getTotalPage = function(){
        return Math.ceil($scope.courses.length/$scope.pageSize);
    }

    $scope.getCurrentPage = function(){
        return $scope.start/$scope.pageSize;
    }

    $scope.goToPage = function(page){
        $scope.currentPage = page;
        $scope.start = (page - 1) * $scope.pageSize;
    }

    
   
   


});