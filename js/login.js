app.controller('LoginController', function($scope, $location){

    $scope.checkLogin = function(){
        console.log('check login in LoginCtrl called');
        if(sessionStorage.getItem('user')){
            $location.url('index');
            $scope.$parent.checkLogin();
        } 
    };

    $scope.checkLogin();

    $scope.username = localStorage.getItem('username');
    $scope.password = localStorage.getItem('password');
    if($scope.username != null){
        $scope.isRemember = true;
    }

    $scope.login = function(){
        sessionStorage.removeItem('user');
        var username = $scope.username;
        var password = $scope.password;
        var message = '';
        if(!username || !password) {
            message  = 'Không để trống username hoặc password';
        }
        else 
            for(var user of $scope.users){
                if(user.username == username && user.password == password){
                    sessionStorage.setItem('user', JSON.stringify(user));
                    //check nếu user chọn ghi nhớ mật khẩu
                    if($scope.isRemember){
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                    }else{
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                    }
                    $scope.checkLogin();
                    return;
                }
            }
        $scope.isLoginFail = true;
        $scope.message = message;
    };

    console.log($scope.users);


})
.controller('RegisterController', function($scope, $location){
    $scope.user = {};
    $scope.checkLogin = function(){
        console.log('check login in LoginCtrl called');
        if(sessionStorage.getItem('user')){
            $location.url('index');
            $scope.$parent.checkLogin();
        } 
    };
    $scope.checkLogin();

    $scope.checkExistUsername = function(){
        // console.log(this);
        for(var user of $scope.users){
            if(user.username == $scope.user.username){
                this.registerForm.un.$setValidity('username', false);
                $scope.usernameExists = true;
                return;
            }
        }
        $scope.usernameExists = false;
    };

    $scope.checkExistEmail = function(){
        // console.log(this);
        for(var user of $scope.users){
            if(user.email == $scope.user.email){
                this.registerForm.email.$setValidity('email', false);
                $scope.emailExists = true;
                return;
            }
        }
        $scope.emailExists = false;
    };

    $scope.add = function(){
        var user = $scope.user;
        $scope.users.push(user);
        sessionStorage.setItem('user', JSON.stringify(user));
        // console.log(user);
        // console.log($scope.users);
        alert('Bạn đã đăng ký tài khoản thành công!');
        $scope.checkLogin();
    };

    console.log($scope.users);
});
