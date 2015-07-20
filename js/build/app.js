var app = angular.module('outSales', ['ngDialog']);

app.factory('Mandrill', ['$http', 'ngDialog',
    function($http, ngDialog) {
        var fromEmail = 'out-sales@info.ru';
        var fromName = 'C Сайта';
        var replyTo = 'email';

        return {
            messageWork: function(resp) {
                return $http.post('https://mandrillapp.com/api/1.0//messages/send.json', {
                    'key': 'NHi8r1hU9Nla-gHjnit-jg',
                    'message': {
                        'html': resp.msg ,
                        'subject': resp.subject,
                        'from_email': fromEmail,
                        'from_name': fromName,
                        'to': [
                            {
                                'email': "info@out-sales.ru",
                                'type': 'to'
                            }
                        ],
                        'headers': {
                            'Reply-To': replyTo
                        }
                    }
                })
                .success(function(data, status, headers, config){

                });
            }
        };
}]);


app.directive('mask', function () {
    return {
        link: function(scope, elm, attrs) {
            elm.mask("+7 (999) 999-99-99");
        }
    };
});


app.controller('mainCtrl', ['$scope', '$rootScope' , 'ngDialog', function($scope, $rootScope, ngDialog){
    $scope.openOrderCallPopup = function(){
        ngDialog.open({
            template: 'orderCallPopup.html',
            className: 'popup'
        });
    };
    $scope.openLeaveApplication = function(plan){
        ngDialog.open({
            template: 'leaveApplicationPopup.html',
            className: 'popup',
            data: plan
        });
    };
}]);


app.controller('leaveApplicationCtrl', ['$scope', 'ngDialog', 'Mandrill', function($scope, ngDialog, Mandrill){
    $scope.sended = false;
    $scope.leaveApplicationData = {
        subject: 'Оставить заявку',
        name: '',
        phone: '',
        email: '',
        msg: '',
        msgF: function(){
            return this.msg = this.name + ' оставил заявку на план . Контактные данные: tel: '+ this.phone + ' email: ' +this.email;
        }
    };
    $scope.leaveApplicationSend = function(f){

        f.msgF()
        if(f.name == '' || f.phone == '' || f.email ==''){
            console.log('Ошибка телефон: ' + f.phone + ' имя ' + f.name);
        }else{
           Mandrill.messageWork(f).success(function(){
                $scope.sended = true;
                setTimeout(function(){
                    ngDialog.closeAll();
                }, 1000);
           });
        }
    }
}]);

app.controller('orderCallPopupCtrl', ['$scope', 'ngDialog', 'Mandrill', function($scope, ngDialog, Mandrill){
    $scope.sended = false;
    $scope.orderCallData = {
        subject: 'Заказать звонок',
        name: '',
        phone: '',
        msg: '',
        msgF: function(){
            return this.msg = this.name + ' заказал звонок на номер '+ this.phone;
        }
    };
    $scope.orderCallSend = function(f){

        f.msgF()
        if(f.name == '' || f.phone == ''){
            console.log('Ошибка телефон: ' + f.phone + ' имя ' + f.name);
        }else{
           Mandrill.messageWork(f).success(function(){
                $scope.sended = true;
                setTimeout(function(){
                    ngDialog.closeAll();
                }, 1000);
           });
        }
    }
}]);




app.controller('leaveApplicationMiniCtrl', ['$scope', 'ngDialog', 'Mandrill', function($scope, ngDialog, Mandrill){
    $scope.leaveApplicationMiniData = {
        subject: 'Оставить заявку',
        name: '',
        phone: '',
        msg: '',
        msgF: function(){
            return this.msg = this.name + ' оставил заявку. Контактные данные: tel: '+ this.phone;
        }
    };
    $scope.leaveApplicationMiniSend = function(f){
        f.msgF()
        if(f.name == '' || f.phone == ''){
            console.log('Ошибка телефон: ' + f.phone + ' имя ' + f.name);
        }else{
           Mandrill.messageWork(f).success(function(){
                ngDialog.open({
                    template: 'confirmPopup',
                    className: 'confirmPopup',
                });

                setTimeout(function(){
                    ngDialog.closeAll();
                }, 1000);


           });
        }
    }
}]);

app.controller('questionFormCtrl', ['$scope', 'ngDialog', 'Mandrill', function($scope, ngDialog, Mandrill){
    $scope.questionFormData = {
        subject: 'Вопрос',
        name: '',
        phone: '',
        email: '',
        question: '',
        msg: '',
        msgF: function(){
            return this.msg = 'Гражданин '+ this.name + ' задал вопрос: <br>'+ this.question + '<br> Контактные данные: email: ' +this.email + ' телефон: ' + this.phone;
        }
    };
    $scope.questionFormSend = function(f){
        f.msgF();
        if(f.name == '' || f.phone == '' || f.email =='' || f.question == ''){
            console.log('Ошибка телефон: ' + f.phone + ' имя ' + f.name);
        }else{
           Mandrill.messageWork(f).success(function(){
                ngDialog.open({
                    template: 'questionResponse',
                    className: 'confirmPopup',
                });
                setTimeout(function(){
                    ngDialog.closeAll();
                }, 1000);
           });
        }
    }
}]);