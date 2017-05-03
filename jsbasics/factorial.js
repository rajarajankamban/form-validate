/*1) Find the factorial of a given number. If the given number is 5, factorial is computed as 5*4*3*2*1 which equates to 120. Please write a program which would find the factorial for any number.
Input: 5
Output: 120 */


function fact(num){
    var sum = 1;
    for(var i = 1; i<=num; i++){
        sum *= i;
    } 
    return sum;
}

function facto(num){
    return num==1 ? 1 : num * fact(num-1);
}

console.log("Basic Fact:"+ fact(5));
console.log("Call Back Fact:"+ facto(5) );