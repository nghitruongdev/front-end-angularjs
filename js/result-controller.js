app.controller('ResultController', function ($scope, $rootScope) {



    $scope.showResult = function () {
        var correct = 0;
        var quizzes = $scope.$parent.quizzes;
        for (var quizz of quizzes) {
            if (quizz.answer == quizz.AnswerId) {
                correct++;
            }
        }
        $scope.correct = correct;
        $scope.unanswered = quizzes.length - $scope.$parent.quizzAnswered.length;
        $scope.incorrect = quizzes.length - $scope.correct - $scope.unanswered;
        $scope.chart = createChart($scope);
       
    };

    $rootScope.$on("ResultController_ShowResult", $scope.showResult());

    var checkButtonState = function (selected, index) {
        if (selected == index) {
            $scope.selected = undefined;
            $scope.list = [];
            return false;
        } else {
            $scope.selected = index;
            return true;
        }
    }
    $scope.showList = function (option) {
        switch (option) {
            case 'all':
                if(checkButtonState($scope.selected, 0)) 
                    $scope.list = $scope.quizzes;
                break;
            case 'correct':
                if(checkButtonState($scope.selected, 2)) 
                    $scope.list = $scope.quizzes.filter(q => q.answer == q.AnswerId);
                break;
            case 'incorrect':
                if(checkButtonState($scope.selected, 1)) 
                    $scope.list = $scope.quizzes.filter(q => q.answer != undefined && q.answer != q.AnswerId);
                break;
        }
    };

    $scope.takeAnotherTest = function () {
        for (var quizz of $scope.quizzes) {
            quizz.answer = undefined;
        }
        $scope.setScreenShow('start');
    };

    $scope.resetQuizz = function(){
        for (var quizz of $scope.quizzes) {
            // quizz.answer = undefined;
            quizz.isShow = false;
        }
        var oldQuizzes = angular.copy($scope.quizzes);
        $scope.startQuizz(oldQuizzes);
    }
});

var createChart = function($scope){
        const labels = [
        'Đáp án đúng',
        'Đáp án sai',
        'Chưa trả lời'
      ];
    
      const data = {
        labels: labels,
        datasets: [{
          label: 'My First dataset',
          backgroundColor: [
            // 'rgb(30, 161, 54)',
            'rgb(101, 176, 176)',
            'rgb(237, 109, 133)',
            'rgb(225, 225, 225)'
          ],
          hoverOffset: 4,
          data: [$scope.correct, $scope.incorrect, $scope.unanswered],
        //   data: [2, 4, 4],
        }]
      };

      const config = {
        type: 'doughnut',
        data: data,
        options: {}
      };

      return new Chart(
        document.getElementById('myChart'),
        config
      );

}