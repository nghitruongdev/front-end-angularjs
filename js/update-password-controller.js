app.controller('UpdatePasswordController', function ($scope, $location) {
    if (!$scope.isLogin) {
        $location.url('login');
    }
    $scope.changePassword = function () {
        var currentUser = $scope.user;
       
        if ($scope.old == currentUser.password) {
            currentUser.password = $scope.password;

            // sessionStorage.setItem('user', JSON.stringify(currentUser));
            for (let index = 0; index < $scope.users.length; index++) {
                var user = $scope.users[index];
                if(user.username == currentUser.username){
                    $scope.users[index] = currentUser;
                    break;
                }
            }
            alert('Cập nhật mật khẩu thành công');
            $location.url('index');
        }
    };
});
