app.controller('UpdateProfileController', function($scope, $location){
    if (!$scope.isLogin) {
        $location.url('login');
    }
    $scope.user = angular.copy($scope.$parent.user);
    $scope.clear = function(){
        this.updateForm.$setPristine();
        this.updateForm.$setUntouched();
        $scope.user = angular.copy($scope.$parent.user);
    }

    $scope.save = function(){
        $scope.$parent.user = $scope.user;
        for(var user of $scope.users){
            if(user.username == $scope.user.username){
                user = $scope.user;
                break;
            }
        }
        alert('Cập nhật thông tin thành công');
        $scope.clear();
    }
});