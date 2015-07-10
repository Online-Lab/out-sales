angular.module('outSales', [])

  .factory('Mandrill', ['$http',
    function($http) {

      var fromEmail = 'out@sales.com';
      var fromName = 'From_site';
      var replyTo = 'out@sales.com';
      messageWork: function(resp) {
        return $http.post('https://mandrillapp.com/api/1.0//messages/send.json', {
          'key': 'NHi8r1hU9Nla-gHjnit-jg',
          'message': {
            'html': '<p>Unknown Message</p><p>' + resp + '</p><p>Code:' + resp.messagetext + '</p>',
            'text': resp,
            'subject': 'Unknown Message',
            'from_email': fromEmail,
            'from_name': fromName,
            'to': [
            {
              'email': resp.toEmail,
              'name': resp.toName,
              'type': 'to'
            }
            ],
            'headers': {
              'Reply-To': replyTo
            }
          }
        })
        .success(function(data, status, headers, config){
          console.log(data, status, headers, config);
        });
      }

    //   var sendEmail = function(emailTo, theme, msg){
    //     $.ajax({
    //       "type": "POST",
    //       "url": "https://mandrillapp.com/api/1.0/messages/send.json",
    //       "data": {
    //         "key": "NHi8r1hU9Nla-gHjnit-jg",
    //         "message": {
    //           "from_email": "site@example.com",
    //           "to": [
    //               {
    //                 "email": "info@out-sales.ru",
    //                 "name": "" + emailTo,
    //                 "type": "to"
    //               }
    //             ],
    //           "autotext": true,
    //           "subject": theme + "",
    //           "html": msg + ""
    //         }
    //       }
    //      }).done(function(response) {
    //        console.log(response);
    //      });
    // }

      return {
        messageWork: messageWork;
      };
  }])

  .controller("MainCtrl", [ '$scope', function($scope){

  })]