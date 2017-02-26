angular.module('MYAPP', ['reportService'])
.controller('Hello',['$scope', '$http',function($scope, $http) {
	var data ={
"booking_id": "1ff08e71-b8cf-488f-8d40-10da4352edce",
"drop_location": {
"address": "Bangalore",
"lat": "12.4999",
"lng": "77.5418"
}
};
	$http.post(
                ' http://devices.olacabs-dev.in/sqspush/pushEvent',
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Basic REFQSTpjaGFsb25pa2xv'
                    }
                }
            ).
	success(function(data) {
            $scope.greetingeds = data;
        })

    $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        })
    $http.get('http://DAPI:chaloniklo@devices.olacabs-dev.in/device/getABTesting?imei=865527023747575',{withCredentials :true}).
        success(function(data) {
            $scope.greeting = data;
        })    
    $http.get('http://stg-bpd.corp.olacabs.com/bpd/rest/v1/zoneInfo/3?zoneType=hot_spot_zone').
        success(function(data) {
            $scope.greeting = data;
        })
    }]);