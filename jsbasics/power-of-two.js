/*4) Given a number, find the closest power of 2 which is less than or equal to the number. If the number is 36, your answer should be 5 as 32 (2^5) is the closest power less than 36.
Input: 36
Output: 5*/

console.log("Enter number :");

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    console.log("Sum of 3 or 5 muliti for "+parseInt(d)+" is :"+multi_sum(parseInt(d)));
});

function powerTwo(num){
    for(i=1;sum<=num;i++){
        sum = Math.pow(2,i);
    }
    if(sum == num){
        return {'power':i,'num':num};
    }
    else{
        return {'power':i,'num':num};
    }
}