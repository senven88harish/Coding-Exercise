/**
 * Created by venkateshkumar on 4/21/17.
 */
codingExApp.factory('loanService',['$http','$log','$q',function($http, $log, $q){
    var loanDetails = function(){
        var defered = $q.defer();
        $http.get('/reference-data/loan.csv')
            .success(function(csvdata){
                var record = csvdata.split(/\r\n|\n/);
                var headers = record[0].split(',');
                var results = [];
                for(var i = 1; i < record.length ;i++) {
                    var newRecord = record[i].split(',');
                    var obj = {};
                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j].toLowerCase().replace(' ','_')] = newRecord[j];
                    }
                    results.push(obj);
                }
                defered.resolve(results);
            }).error(function(msg, code){
                defered.reject(msg);
            });
        return defered.promise;
    };
    return {
        loanDetails: loanDetails
    };
}]);