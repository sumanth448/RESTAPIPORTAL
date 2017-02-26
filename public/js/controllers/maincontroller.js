var app = angular.module('mainController', ['reportService','xeditable']);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

/*app.run(function($httpBackend) {
    $httpBackend.whenPOST(/\/saveUser/).respond(function(method, url, data) {
    data = angular.fromJson(data);
    return [200, {status: 'ok'}];
  });
});*/

// inject the Report service factory into our controller
app.controller('Hello', ['$scope', '$interval', '$http', 'Reports', function($scope, $interval, $http, Reports) {
    //start
    $scope.showdiv = "false";
    $scope.finderloader=false;
    //send data to the server
    $scope.Send = function(type, url) {
         $scope.finderloader=true;
         $scope.myTextarea="";
         for (var i = 0; i < $scope.headers.length; i++) {
          console.log( $scope.headers[i].key );
    }
         $scope.showdiv = "true";
        console.log(type.name);
        console.log($scope.textModel);
        var payload = {
            "type": type.name,
            "url": url,
            "headers":$scope.headers,
            "params" : $scope.users,
            "body" : $scope.textModel       
        }
        Reports.pushdata(payload)
            // if successful creation, call our get function to get all the new data
            .success(function(data) {
            console.log(data);
            $scope.finderloader=false;
            if (data.statusCode == 200){
                data = JSON.parse(data.body);
                $scope.myTextarea=JSON.stringify(data, null, 2);
                //$scope.output = syntaxHighlight(JSON.stringify(data, undefined, 4));
                console.log(data);
                console.log('Replaced successfully');
            }else{
                $scope.myTextarea=data.body;
            }
            })
            .error(function(error, status) {
                $scope.finderloader=false;
                $scope.myTextarea=error;
            });
    }
    //request types
    $scope.requesttypes = [{
        name: "GET"
    }, {
        name: "POST"
    }, {
        name: "PUT"
    }];
    $scope.requesttype = $scope.requesttypes[0];
    $scope.custom = true;
    $scope.toggleCustom = function() {
        $scope.custom = $scope.custom === false ? true : false;
    };
    $scope.users=[{}];
    $scope.headers=[{}];
   /* $scope.users = [{
        key: 'key',
        value: 'value'
    }];*/
    $scope.saveUser = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {
            key: id
        });
        //return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser = function(index) {
        $scope.users.splice(index, 1);
    };
    
    //remove all users
     $scope.deleteUser = function() {
        $scope.users.splice(0,$scope.users.length);
    };

    // add user
    $scope.addUser = function() {
        $scope.inserted = {
            key: $scope.users.length + 1,
            value: ''
        };
        $scope.users.push($scope.inserted);
    };
    $scope.inputType = 'password';
  
  // Hide & show password function
  $scope.hideShowPassword = function(){
    if ($scope.inputType == 'password')
      $scope.inputType = 'text';
    else
      $scope.inputType = 'password';
  };
    
    //for headers
     $scope.saveUser1 = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {
            key: id
        });
        //return $http.post('/saveUser', data);
    };

    // remove user
    $scope.removeUser1 = function(index) {
        $scope.headers.splice(index, 1);
    };
    
    //remove all users
     $scope.deleteUser1 = function() {
        $scope.headers.splice(0,$scope.headers.length);
    };

    // add user
    $scope.addUser1 = function() {
        $scope.inserted = {
            key: $scope.headers.length + 1,
            value: ''
        };
        $scope.headers.push($scope.inserted);
    };
    //add Auth in header
    $scope.Addauth = function(username,password) {
        console.log(username);
        console.log(password);
        var encodedauth = "Basic " + btoa(username + ":"+ password);
        console.log(encodedauth);
        $scope.inserted = {
            key: 'Authorization',
            value: encodedauth
        };
        for(var i=0;i<$scope.headers.length;i++)
            {
                if($scope.headers[i].key == "Authorization"){
                    $scope.headers.splice(i, 1);
                }
            }
        $scope.headers.push($scope.inserted);
    };
    //add params 
    $scope.Evaluate=function(url){
        console.log("entered evaluate");
        console.log(url);
       $scope.users.splice(0,$scope.users.length);
        if(url.length !== 0){
       var result = url.split("?");
       var finalresult = result[1].split("&");
       for(var i=0;i<finalresult.length;i++)
           {
               var finalvalue= finalresult[i].split("=");
               $scope.inserted ={
                   key : finalvalue[0],
                   value : finalvalue[1]
               };
               $scope.users.push($scope.inserted);
           }   
      }
    }
    //file upload
    $scope.data = 'none';
    $scope.fileupload = function(){
  var f = document.getElementById('file').files[0],
      r = new FileReader();
      r.onloadend = function(e){
      $scope.data = e.target.result;
    //send your binary data via $http or $resource or do anything else with it
  }
  r.readAsBinaryString(f);
}
}]);
