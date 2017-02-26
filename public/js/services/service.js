angular.module('reportService', [])

    // super simple service
    // each function returns a promise object
    .factory('Reports', ['$http', function ($http) {
        return {
            pushdata: function (payload) {
                return $http.post('api/push',payload);
            }
        }
    }]);
