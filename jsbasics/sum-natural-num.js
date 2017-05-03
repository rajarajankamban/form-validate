/*2) If we list all the natural numbers till 10 i.e. 1 to 10, the sum of these numbers is 55. Find the sum of the first 500 natural numbers.
Input: 10
Output: 45 */

function sum(num){
    return num == 1 ? 1 : num + sum(num-1);
}

//console.log("sum of natural num : "+sum(5));


var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    console.log("Sum of "+parseInt(d)+" is :"+sum(parseInt(d)));
});