/*4) Given a number, find the closest power of 2 which is less than or equal to the number. If the number is 36, your answer should be 5 as 32 (2^5) is the closest power less than 36.
Input: 36
Output: 5*/

console.log("Enter number :");

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    var data = powerTwo(parseInt(d));
    console.log("Power of less than or equal to number "+parseInt(d)+" is :"+data.power+" value as "+data.num);
});

function powerTwo(num){
    var sum = 0;
    var i;
    var data = {"power":"","num":""};
    for(i=1;sum<=num;i++){
        sum = Math.pow(2,i);
        console.log(" i =" + i + " : "+sum);
    }   
        data.power = i-2;
        data.num = Math.pow(2,i-2);
        console.log("data :"+JSON.stringify(data));
        return data;
}

