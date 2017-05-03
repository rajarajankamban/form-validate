/*6) Find all pairs in array of integers whose sum is equal to given number.
Input: sum = 8
[1, 4, 3, 5, 4, 6, 7, 8, 3]
Output:
"1, 7"
"4, 4"
"3, 5"
"5, 3"*/

console.log("Enter number :");

var stdin = process.openStdin();
stdin.addListener("data", function(d) {
    console.log("Pairs of  "+parseInt(d)+" is :"+findPairSum(parseInt(d)));
});

function findPairSum(num){
    var arr = [1, 4, 3, 5, 4, 6, 7, 8, 3];
    var data = [];
    var i=0,j=0;
    var checkpair = function(p1,p2){
        
        return arr[p1]+arr[p2] == num;
    }

    function compareArr(i,j){

        if(checkpair(i,j)){
            data.push(''+arr[i]+'-'+arr[j]+'');
        }
        if(j==arr.length){
                j = i+1;
                i++;
        }
        console.log("i:"+i+" j:"+j);
        if(i==arr.length-1){
            return 0;
        }
            return compareArr(i,j+1);
        
    }
    compareArr(i,j);

    return data;
}