var maxTime = 1000;

var evenDoubler = function(v,callback){
  var waitTime = Math.floor(Math.random()*(maxTime+1));
  if(v%2){
    setTimeout(function(){
      callback("Error Input :" + v);
    },waitTime);
  }
  else{
    setTimeout(function(){
      callback(null,v*2,waitTime);
    },waitTime);
  }  
}


var handleResults = function(err,results,time){
  if(err){
    console.log("Error : "+err);
  }
  else{
    console.log("Result :"+ results + " " + time + " ms");
  }
}


for(i=0;i<10;i++){
  evenDoubler(i, handleResults);
  console.log("Called Num: "+i);
}

console.log("done.");