
/*
3) If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.
Input: 10
Output: 23*/

console.log("Enter number :");

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    console.log("Sum of 3 or 5 muliti for "+parseInt(d)+" is :"+multi_sum(parseInt(d)));
});


// if(num % 3 ==0) sum += num
// if(num % 5 ==0) sum += numasdf

function multi_sum(num){
    return num==1 ? 0 : (num % 3 == 0) || (num % 5 == 0)? num + multi_sum(num-1): 0 + multi_sum(num-1) ; 
}

function multisumSimple(num){
    var sum = 0;
    for (var i = 1; i < num; i++){
        if((i % 3 == 0) || (i % 5 == 0)){
            sum += i;     
        }
    }
    return sum;
}