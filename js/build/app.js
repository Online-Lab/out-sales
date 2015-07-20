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
                    console.log(data);
                    console.log(status);
                    ngDialog.closeAll();

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
    $scope.openOrderCallPopup = function(namePopup){
        ngDialog.open({
            template: 'orderCallPopup.html',
            className: 'popup',
            controller: ['$scope', 'Mandrill', 'ngDialog', function($scope, Mandrill, ngDialog){
                
            }]
        });
    };
}])


app.controller('popupCtrl', ['$scope', 'ngDialog', 'Mandrill', function($scope, ngDialog, Mandrill){
    $scope.close = function(){
        console.log(ngDialog.closeAll());
        ngDialog.closeAll();
    };
    $scope.user = {};
    $scope.orderCall = {
        hideEmail: true,
        resp:{
            subject: 'Заказать звонок',
            msg: $scope.user.name + ' Заказал звонок на номер ' + $scope.user.phone
        }
        
    };
    $scope.sendEmail = function(user){
        console.log(user);
        // Mandrill.messageWork(user);
    }
}])

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
    var msg = function(){
        console.log($scope.orderCallData.name + ' заказал звонок на номер '+ $scope.orderCallData.phone);
    }


    $scope.orderCallSend = function(f){
        f.msgF()
        if(f.name == '' || f.phone == ''){
            console.log('Ошибка телефон: ' + f.phone + ' имя ' + f.name);
        }else{
           // Mandrill.messageWork(f);
           console.log(f);
        }
    }
}]);


