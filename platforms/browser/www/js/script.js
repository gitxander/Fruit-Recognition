$(document).on('pagecreate','#menu',function(){
  $('#btnscan').on('tap',function(){
    $.mobile.changePage('#scan',{transition: 'pop',changeHash: false});
  });
});

$(document).on('pagecreate','#scan',function(){

  $('#upload').on('submit',function(e){
      e.preventDefault();
      $('.searchresult').empty();
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
                    t+= '<label> Error Uploading File.. Please try again ! </label>';
                    $('.searchresult').html(t);

                     $('#progressbar').css('display','none');
                   }
                 });
      //  }
      //},1000);
    });

    function testdata(fruitname){
      console.log(fruitname);
      var sorted = [];
      var testarray = fruitname.split(" ");
      for(var i=0;i<testarray.length;i++){
        sorted.push(testarray[i].toLowerCase());
      }

      if( (sorted.indexOf("dragon") >= 0 && sorted.indexOf("fruit") >= 0) || sorted.indexOf("dragonfruit") >= 0){
        //Dragon Fruit
        viewdata("Dragon Fruit","Hylocereus undatus","scan/list/dragonfruit.html");
      }
      else if(sorted.indexOf("jackfruit") >= 0) {
        viewdata("Jackfruit (Langka)","Artocarpus heterophyllus","scan/list/jackfruit.html");
      }
      else if(sorted.indexOf("pineapple") >= 0){
        viewdata("Pineapple (Pinya)","Ananas comosus","scan/list/pineapple.html");
      }
      else if(sorted.indexOf("avocado") >= 0){
         viewdata("Avocado","Persea americana","scan/list/avocado.html");
      }
      else if(sorted.indexOf("banana") >= 0){
         viewdata("Banana (Saging)","Musa acuminata or Musa balbisiana","scan/list/banana.html");
      }
      else if(sorted.indexOf("sugar") >= 0 && sorted.indexOf("apple") >= 0){
        viewdata("Sugar Apple (Atis)","Annona squamosa","scan/list/applesugar.html");
      }
      else if(sorted.indexOf("guava") >= 0){
         viewdata("Guava (Bayabas)","Psidium guajava","scan/list/guava.html");
      }
      else if(sorted.indexOf("corn") >= 0){
         viewdata("Sweet Corn (Mais)","Zea mays","scan/list/corn.html");
      }
      else if(sorted.indexOf("mango") >= 0){
         viewdata("Mango (Manga)","Mangifera indica","scan/list/mango.html");
      }
      else if(sorted.indexOf("coconut") >= 0){
         viewdata("Coconut (Buko)","Cocos nucifera","scan/list/coconut.html");
      }
      else if(sorted.indexOf("soursop") >= 0){
         viewdata("Soursop (Guyabano)","Annona muricata","scan/list/custardapple.html");
      }
      else if(sorted.indexOf("watermelon") >= 0){
         viewdata("Watermelon (Pakwan)","Citrullus lanatus","scan/list/watermelon.html");
      }
      else if(sorted.indexOf("rambutan") >= 0){
         viewdata("Rambutan","Nephelium lappaceum","scan/list/rambutan.html");
      }
      else if(sorted.indexOf("calamondin") >= 0){
         viewdata("Calamondin (Kalamansi)","Fortunella japonica","scan/list/calamansi.html");
      }
      else if(sorted.indexOf("tangerine") >= 0){
         viewdata("Tangerine (Dalanghita)","Citrus tangerina","scan/list/tangerine.html");
      }
      else if(sorted.indexOf("orange") >= 0 && sorted.indexOf("fruit") >= 0){
         viewdata("Tangerine (Dalanghita)","Citrus tangerina","scan/list/tangerine.html");
      }
      else if(sorted.indexOf("star") >= 0 && sorted.indexOf("apple") >= 0){
         viewdata("Star Apple (Kaimito)","Chrysophyllum cainito","scan/list/starapple.html");
      }
      else if(sorted.indexOf("pomelo") >= 0){
         viewdata("Pomelo (Suha)","Citrus maxima","scan/list/pomelo.html");
      }
      else {
        var t = '';
        t+= "<label> Can't Recognize! </label>";
        $('.searchresult').html(t);
      }
      $('#progressbar').css('display','none');
    }

    function viewdata(genericname,scientificname,link){
      if(typeof(genericname) != 'undefined' || genericname != "" ) {
        var t = '';
        t+= '<h3>Generic Name: <label id="fruit_name">'+genericname+'</label></h3>';
        t+= '<h3>Scientific Name: <label id="science_name">'+scientificname+'</label></h3>';
        t+= '<a href="'+link+'" rel="external" class="ui-btn" data-role="button">View Data</a>';
        //$("#message").html(data['message']);
        $('.searchresult').html(t);
      }

    }


});
