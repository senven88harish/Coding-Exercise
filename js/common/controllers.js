/**
 * Created by venkateshkumar on 4/21/17.
 */
codingExApp.controller('Task1Ctrl',['$scope', 'loanService', function($scope, loanService){
    console.log('Task 1 calling');

    $scope.loandetail = function(){
        loanService.loanDetails().then(function(data){

            //Grouping unique combination of JSON file
            var uniqueLoanPurpose = [];
            angular.forEach(data,function(value, key){
                if(uniqueLoanPurpose.indexOf(value.loan_purpose) === -1){
                    uniqueLoanPurpose.push(value.loan_purpose);
                }
            });

            var result = [];

            for(var i = 0; i < uniqueLoanPurpose.length ;i++){
                angular.forEach(data,function(value, key){
                    if(uniqueLoanPurpose[i] === value.loan_purpose){
                        result.push({
                            loan_purpose: value.loan_purpose,
                            industry_type: value.industry_type
                        });
                        uniqueLoanPurpose.splice(i, 1);
                    }
                });
            }

            $scope.csvData = result;
        },function(error){
            console.log(error);
        });
    };

    $scope.loandetail();

}]);


codingExApp.controller('Task2Ctrl',['$scope', 'investorConst', function($scope, investorConst){

    $scope.addTemplate = function(){
        if($scope.investorsCount <= investorConst.INVESTOR_MAX ){
            var addOneInvestor = $scope.investorsCount + 1;

            $scope.investorCount = [];
            for(var i = 0; i < addOneInvestor; i++){
                $scope.investorCount.push({
                    id: "A"+(i+1),
                    percent: "",
                    yield: "",
                    interest_priority: i === 0 ? 1 : '',
                    principal_priority: ""
                })
            }
        }else{
            $scope.investorCount = [];
            console.log('only '+investorConst.INVESTOR_MAX+' can submit');
        }
    };

    $scope.addSumPerc = function(e){
        console.log(e.displayInvestor.id);
        if(e.displayInvestor.percent <= investorConst.PERCENTAGE){
            console.log(e.displayInvestor.percent)
        }else{
            console.log("either its less than 0 or greater than "+investorConst.PERCENTAGE);
        }
    };

    $scope.addSequence = function(e){
        console.log(e);
    };

    $scope.submitForm = function(){
        console.log($scope.investorCount);
    }

}]);
