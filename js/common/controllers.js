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
    var sequenceVal = [1];

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

    $scope.addSequence = function(id){
        var selectedVal = angular.element('#'+id).val();
        var priorityValue = parseInt(selectedVal);
        var maxAllowed = $scope.investorCount.length * 2;
        if(sequenceVal.indexOf(priorityValue) > -1){
            $scope.rejectEditing = true;
        }else if((priorityValue >= 2) && (priorityValue <= maxAllowed) && sequenceVal.indexOf(priorityValue) === -1) {
            sequenceVal.push(priorityValue);
        }else if(priorityValue <= 0 || priorityValue > maxAllowed){
            alert("please enter 2 to "+maxAllowed+" in the priority box");
            angular.element('#'+id).val('')
        }
    };

    $scope.submitForm = function(){
        var total = 0;
        var percGivenId = [];
        var perNotGivenId = [];
        for(var i=0; i< $scope.investorCount.length;i++){
            var elemVal = parseFloat(angular.element('#percent_'+(i+1)).val());
            if(elemVal && elemVal > 0){
                percGivenId.push(i+1);
                total = elemVal+total;
            }else if(!elemVal || elemVal === 0){
                perNotGivenId.push(i+1);
            }
        }

        if(total >=0 && total<=100){
            var equalPer = (investorConst.PERCENTAGE - total)/perNotGivenId.length;
            for(var j=0; j< perNotGivenId.length; j++){
                angular.element('#percent_'+perNotGivenId[j]).val(equalPer)
            }
        }else if(total < 0 || total > 100){
            alert('please , the total of all percent not exceed 100 %');
            for(var k=0; k< percGivenId.length; k++){
                angular.element('#percent_'+percGivenId[k]).val(0)
            }
        }

        console.log($scope.investorCount);
    }

}]);
