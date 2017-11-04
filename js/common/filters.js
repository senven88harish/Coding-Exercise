/**
 * Created by venkateshkumar on 4/21/17.
 */
codingExApp.filter('titleConvert',function(){
    return function(input){
        if(input){
            var result = input.replace("_", " ");
            result =  result.charAt(0).toUpperCase() + result.slice(1);
        }
        return result || input;
    }
});