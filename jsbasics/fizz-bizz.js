/*5) Write a program that prints the numbers from 1 to N. But,  for multiples of three,  print “Fizz” instead of the number and for the multiples of five print “Buzz”. For numbers which are multiples of both three and five print “FizzBuzz”.
Input: N = 17
Output:
1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz,16,17*/

console.log("Enter number :");

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    console.log("Array for "+parseInt(d)+" is :"+fizzbizz(10));
});

function fizzbizz(num){
    var data = [];
    var i = 1;
    var generate =  function(i){
            if(i%3 == 0){
                return data.push("Fizz") ;
            }
            else if(i%5 ==0){
                return "Buzz";
            }
            else{
                return i;
            }
        }

    function add(i){
        if(i<num){
            data.push(generate(i++));
            return add(i);
        }
    }
    
    add(i);
    return data;
}