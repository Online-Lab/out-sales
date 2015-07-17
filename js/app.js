var app = angular.module('outSales', ['ngDialog']);

app.factory('Mandrill', ['$http',
    function($http) {
        var fromEmail = 'out-sales.ru';
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
                // log success
                });
            }
        };
}]);
app.controller('mainCtrl', ['$scope', '$rootScope' , 'ngDialog', 'Mandrill', function($scope, $rootScope, ngDialog, Mandrill){
    $scope.user = {};
    $rootScope.orderCall = {
        hideEmail: true,
        resp:{
            subject: 'Заказать звонок',
            msg: $scope.user.name + ' Заказал звонок на номер ' + $scope.user.phone
        }
        
    };
    $rootScope.leaveApplication = {
        hideEmail: false,
        msg: 'Оставил заявку'
    };
    $scope.openPopup = function(namePopup){
        ngDialog.open({
            template: 'popup.html',
            className: 'popup',
            data: {hideLastField: namePopup.hideEmail},
            controller: ['$scope', 'Mandrill', 'ngDialog', function($scope, Mandrill, ngDialog){
                
            }],
            resolve:{
                Mandrill: Mandrill.messageWork(namePopup.resp)
            }
        });
    };


}]);
