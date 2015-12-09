$(document).on('pagecreate','#home',function(){

  $('#upload').on('submit',function(e){
      e.preventDefault();
      $('#progressbar').css('display','block');
      //var c = 0;
      //var interval = setInterval(function(){
        //c++;
        //console.log(c);
        //if(c == 5){
          //clearInterval(interval);
          console.log($('#file').val());
          //var url = 'http://localhost:8027/public_html/camfind/ajax_upload.php';
          var url = 'http://raveteam.net/camfind/ajax_upload.php';

              $('#message').empty();
              $.ajax({
                   url: url,
                   type: 'POST',
                   data: new FormData(this),
                   contentType: false,
                   crossDomain: true,
                   cache: false,
                   processData: false,
                   dataType: 'json',
                   success: function(data){
                     console.log(data);
                     testdata(data['fruitname']);
                   },
                   error: function(data){
                     console.log('Error');
                     console.log(data);
                     $('#progressbar').css('display','none');
                   }
                 });
      //  }
      //},1000);
    });

    function testdata(fruitname){

      // switch (fruitname) {
      //   case 'Dragon Fruit':
      //
      //     break;
      //   default:
      //
      // }
      console.log(fruitname);

      if(typeof(fruitname) != 'undefined') {
        var t = '';
        t+= '<h3>Generic Name: <label id="fruit_name">'+fruitname+'</label></h3>';
        //$("#message").html(data['message']);
        $('.searchresult').html(t);
      }
      $('#progressbar').css('display','none');
    }


});
