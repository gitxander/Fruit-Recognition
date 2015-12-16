$(document).on('pageshow','#splash',function(){

    var cnt = 0;
    var interval = setInterval(function(){
      cnt++;
      //console.log(cnt);
      if(cnt == 2){
        clearInterval(interval);
        $.mobile.changePage('#menu',{transition: 'pop',changeHash: false});
      }
    },1000);
});
