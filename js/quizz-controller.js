app.controller('QuizzController', function ($scope, $rootScope,$location, $http, $routeParams, $interval) {
    $scope.setScreenShow = function (screen) {
        $scope.screenShow = screen;
    }

     //c1 - hiển thị luôn ở đây dùng quizCtrl
    //c2 - submit form và đi dến trang result, cái này phải lưu lại 
    //c2.1 rootScope
    //c2.2 sessionStorage(JSON)

    //c3 làm sao để dữ liệu tự động load khi control bên này click?
    $scope.finishTest = function (isCheckUnanswered) {
        //kiểm tra số câu hỏi chưa làm
        if(isCheckUnanswered){
            if ($scope.quizzAnswered.length != $scope.quizzes.length) {
                var rep = confirm('Bạn chưa làm ' + ($scope.quizzes.length - $scope.quizzAnswered.length) + ' câu quizz. Có muốn kết thúc?');
                if (rep != true) {
                    return;
                }
            }
        }
        $rootScope.$emit("ResultController_ShowResult", {}); //not run
        $scope.setScreenShow('result'); //did run
        // alert('Finished Test called'); //did run
    }

    $scope.setTimer = function(){
        var timer = $interval(function () {
            $scope.time--;
            $scope.actualTime++;
            if ($scope.time == 0 || $scope.screenShow == 'result') {
                // alert('Quizz Finished');
                if($scope.screenShow != 'result'){
                    $scope.finishTest(false);
                }
                $interval.cancel(timer);
                console.log(timer);
            }
        }, 1000);
    }

    var id = $routeParams.courseId;
    var url = '../db/quizz/' + id + '.js';

    $scope.allQuizzes = [];
    $scope.parts = [];
    $scope.quizzes = [];
    $scope.courseName = $routeParams.courseName;
    $scope.setScreenShow('start');
   
    $http.get(url).then(function (response) {
        var quizzes = response.data;
        $scope.allQuizzes = quizzes;
        $scope.getParts();
    },
        function () {
            console.log('Error in Get Quiz');
        });

    $scope.getParts = function () {
        while ($scope.allQuizzes.length >  0) {
            var part = $scope.allQuizzes.splice(0, 10);
            $scope.parts.push(part);
        }
        // // Nhớ xoá code sau khi test
        // $scope.quizzes = $scope.parts[0];
    }

        $scope.checkLogin = function(){
        if(!$scope.isLogin){
            alert('Bạn vui lòng đăng nhập để bắt đầu học!');
            $location.url('login');
            return false;
        }
        return true;
    };

    $scope.startQuizz = function(selectedPart){
        if(!$scope.checkLogin()) return;
        if(selectedPart == undefined)
            alert('Vui lòng chọn một bài quizz');
        else{
            $scope.quizzes = selectedPart;
            $scope.setScreenShow('quizz');
            
            $scope.progressStyle = { width: '0px' };
            $scope.unProgressStyle = {width: '100%'}
            $scope.start = 0;
            $scope.quizzAnswered = [];
            $scope.time = 10 * 60;
            $scope.actualTime = 0;
            $scope.setTimer();
        }
    };

    $scope.next = function (isNext) {
        if (isNext && $scope.start < $scope.quizzes.length - 1) {
            ++$scope.start;
            return;
        }

        if (!isNext && $scope.start > 0) {
            --$scope.start;
            return;
        }
    }

    $scope.changeProgress = function (quizz) {
        if (!$scope.quizzAnswered.includes(quizz)) {
            $scope.quizzAnswered.push(quizz);
            var numWidth = ($scope.quizzAnswered.length * 10);
            $scope.progressStyle = { width: numWidth + '%'};
            $scope.unProgressStyle = {width: (100 - numWidth) + '%' };
        }
    }
    $scope.showAnswer = function (quizz) {
        if (quizz.answer == undefined) {
            alert('Bạn chưa chọn đáp án!');
            return;
        }
        quizz.isShow = true;
    }
    

   

    $scope.getTimeText = function (time) {
        var minute = Math.floor(time / 60).toString().padStart(2, '0');
        var second = (time - minute * 60).toString().padStart(2, '0');
        return minute + ' : ' + second;
    }
});
