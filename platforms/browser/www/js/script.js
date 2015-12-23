$(document).on('pagecreate','#menu',function(){
  $('#btnscan').on('tap',function(){
    $.mobile.changePage('#scan',{transition: 'pop',changeHash: false});
  });

});

$(document).on('pagecreate','#scan',function(){
  var db = openDatabase('dbama','1.0','Fruit DB',2 * 1024 * 1024);

  $('#upload').on('submit',function(e){
      e.preventDefault();
      $('.searchresult').empty();
      $('#progressbar').css('display','block');
      //var c = 0;
      //var interval = setInterval(function(){
        //c++;
        //console.log(c);
        //if(c == 2){
          //testdata('sugar apple');
          //clearInterval(interval);
          //console.log($('#file').val());
          // var url = 'http://localhost:8027/public_html/camfind/ajax_upload.php';
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
                       matchdata(data['fruitname']);
                       //matchdata('red apple');
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
        //}
      //},1000);
    });

  $('#scancel').on('tap',function(){
    location.reload();
  });

    //Searching to Database
    //Method 1
    function matchdata(fruitname) {
      var sorted = [];
      var testarray = fruitname.split(" ");
      for(var x=0;x<testarray.length;x++) {
        sorted.push(testarray[x].toLowerCase());
      }

      db.transaction(function(tx){
        //Search Query
        var listfruit = [];
        var stats = [];
        var gUrl = [];
        tx.executeSql("SELECT fruitname,url,status as stat FROM fruitlist WHERE status != 0",[],function(tx,results){
          var len = results.rows.length, i;
          for(i=0;i<len;i++){
            listfruit.push(results.rows.item(i).fruitname);
            stats.push(results.rows.item(i).stat);
            gUrl.push(results.rows.item(i).url);
          }

           var counttest = 0;
           var fruitlength = '';
           var getfruitname;
           var getstatus;
           var geturl;
            for(var k=0;k < listfruit.length; k++){
              counttest  = 0;
              var getsplitfruit = listfruit[k].split(" ");
              getfruitname = listfruit[k];
              getstatus = stats[k];
              geturl = gUrl[k];
              if(getsplitfruit.length > 1) {
                fruitlength = 'Multiple';
                    for( var m=0;m < getsplitfruit.length;m++) {
                      for(var s=0;s < sorted.length;s++) {
                        if(sorted[s] == getsplitfruit[m]) {
                          counttest++;
                          //console.log('Data Founded : '+ counttest);
                        }
                      }
                    }
                    if(counttest > 1){
                      break;
                    }
              }
              else{
                fruitlength = 'Standard';
                for(var s=0;s<sorted.length;s++){
                  if(sorted[s] == getsplitfruit[0]){
                    //console.log('Data Found');
                    counttest = 1;
                    break;
                  }
                }
                if(counttest > 0){
                  break;
                }
              }

            }
            //end of loop
            console.log(fruitlength);
            console.log('Count Test:'+counttest);
            switch (fruitlength) {
              case 'Standard':
                if(counttest == 1){
                  resultdata(getstatus,getfruitname,geturl);
                }
                else {
                  noresult();
                }
                break;
              case 'Multiple':
                if(counttest > 1){
                  resultdata(getstatus,getfruitname,geturl);
                }
                else{
                  noresult();
                }
              break;

            }



          //console.log(listfruit);
        },null);
      });
    }


    //View Result
    function resultdata(getstatus,getfruitname,geturl){

          console.log('Data Found');
          if(getstatus == 1){
            viewdata(getfruitname,geturl);
          }
          else {
            var addedfruits = ['apple','strawberry','grapes','tamarind','star fruit'];
            var tagalogfruits = ['Mansanas','Presa','Ubas','Sampalok','Balimbing'];
            var scienfruits = ['Malus Domestica','Fragaria ananassa','Vitis Vinifera','Tamarindus Indica','Averrhoa Carmbola'];
            for(var t=0;t<addedfruits.length;t++){
              if(getfruitname == addedfruits[t]){
                //console.log('Added');
                nodata(getfruitname,tagalogfruits[t],scienfruits[t],geturl);
                break;
              }
            }
          }

    }

    //No Data Found
    function noresult(){
      $('#progressbar').css('display','none');
      console.log('Not Match');
      var t = '';
      t+= "<label> Can't Recognize! </label>";
      $('.searchresult').html(t);
    }



    //Manual Testing of Fruits
    //Method 2
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
      else if((sorted.indexOf("tangerine") >= 0) || sorted.indexOf("orange") >= 0 && sorted.indexOf("fruit") >= 0){
         viewdata("Tangerine (Dalanghita)","Citrus tangerina","scan/list/tangerine.html");
      }
      else if(sorted.indexOf("star") >= 0 && sorted.indexOf("apple") >= 0){
         viewdata("Star Apple (Kaimito)","Chrysophyllum cainito","scan/list/starapple.html");
      }
      else if(sorted.indexOf("pomelo") >= 0){
         viewdata("Pomelo (Suha)","Citrus maxima","scan/list/pomelo.html");
      }
      else if(sorted.indexOf("melon") >= 0){
         viewdata("Melon (Milon)","Cucumis Melo","scan/list/melon.html");
      }
      else if(sorted.indexOf("cotton") >= 0 && sorted.indexOf("fruit") >= 0){
         viewdata("Cotton Fruit (Santol)","Sandoricum Koetjape","scan/list/cottonfruit.html");
      }
      else if(sorted.indexOf("lanzones") >= 0){
         viewdata("Lanzones (Lansones)","Lansium Domesticum","scan/list/lanzones.html");
      }
      else if(sorted.indexOf("sapodilla") >= 0){
         viewdata("Chico (Tsiko)","Manailkara Zapota","scan/list/sapodilla.html");
      }
      else if(sorted.indexOf("durian") >= 0){
         viewdata("Durian (Durian)","Durio","scan/list/durian.html");
      }
      else {
        var t = '';
        t+= "<label> Can't Recognize! </label>";
        $('.searchresult').html(t);
      }
      $('#progressbar').css('display','none');
    }

    function viewdata(genericname,link){
      $('#progressbar').css('display','none');
      if(typeof(genericname) != 'undefined' || genericname != "" ) {
        genericname = genericname.toUpperCase();
        var t = '';
        t+= '<label id="fruit_name"> Generic Name: '+genericname+'</label>';
        t+= '<a href="'+link+'" rel="external" class="ui-btn ui-btn-inline ui-mini ui-corner-all" id="btnview" data-theme="b">View Data</a>';
        //$("#message").html(data['message']);
        $('.searchresult').html(t);
      }

    }

    function nodata(genericname,tagalog,scientific,link){
      $('#progressbar').css('display','none');
      if(typeof(genericname) != 'undefined' || genericname != ""){
        genericname = genericname.toUpperCase();
        tagalog = tagalog.toUpperCase();
        scientific = scientific.toUpperCase();
        var t = '';
        t+= '<label id="fruit_name">Generic Name: '+genericname +' ('+tagalog+')</label>';
        t+= '<a href="'+link+'" rel="external" class="ui-btn ui-btn-inline ui-mini ui-corner-all" data-theme="b">View Data</a>';
        $('.searchresult').html(t);


      }
    }


});
