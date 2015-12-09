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

                     var t = '';
                    t+= '<label> Error Uploading File.. Please try again ! </labe>';
                    $('.searchresult').html(t);

                     $('#progressbar').css('display','none');
                   }
                 });
      //  }
      //},1000);
    });

    function testdata(fruitname){
      console.log(fruitname);
      $('#progressbar').css('display','none');
      var testarray = fruitname.split(" ");
      if(testarray.indexOf("Dragon") <= 0 && testarray.indexOf("Fruit") <= 0){
        //Dragon Fruit
        viewdata("Dragon Fruit");
      }
      else if(testarray.indexOf("Jackfruit") <= 0) {
        viewdata("Jackfruit");
      }
      else if(testarray.indexOf("Pineapple") <= 0){
        viewdata("Pineapple");
      }
      else {
        var t = '';
        t+= '<label> No Data Found </labe>';
        $('.searchresult').html(t);
      }

    }

    function viewdata(genericname){
      if(typeof(fruitname) != 'undefined') {
        var t = '';
        t+= '<h3>Generic Name: <label id="fruit_name">'+genericname+'</label></h3>';
        //$("#message").html(data['message']);
        $('.searchresult').html(t);
      }
      
    }


});
