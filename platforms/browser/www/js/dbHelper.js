//Database Maintenance
$(document).ready(function(){
    var db = openDatabase('dbama','1.0','Fruit DB',2 * 1024 * 1024);


    db.transaction(function(tx){
      //tx.executeSql("DROP TABLE fruitlist");
      //Create Table for Matching Fruits
      tx.executeSql("CREATE TABLE IF NOT EXISTS fruitlist (fruitname VARCHAR(50) PRIMARY KEY,url VARCHAR(100),status INT)");

      //Status code
      //1 - Full of Information
      //2 - Can Determine but no lack of Information
      //0 - Not Activated

      //Insert All of Fruits
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('dragonfruit','scan/list/dragonfruit.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('jackfruit','scan/list/jackfruit.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('pineapple','scan/list/pineapple.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('avocado','scan/list/avocado.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('banana','scan/list/banana.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('sugar apple','scan/list/applesugar.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('guava','scan/list/guava.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('corn','scan/list/corn.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('mango','scan/list/mango.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('coconut','scan/list/coconut.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('soursop','scan/list/custardapple.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('watermelon','scan/list/watermelon.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('rambutan','scan/list/rambutan.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('calamondin','scan/list/calamansi.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('tangerine','scan/list/tangerine.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('star apple','scan/list/starapple.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('pomelo','scan/list/pomelo.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('melon','scan/list/melon.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('cotton fruit','scan/list/cottonfruit.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('lanzones','scan/list/lanzones.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('sapodilla','scan/list/sapodilla.html',1)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('durian','scan/list/durian.html',1)");

      //Added Fruits
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('apple','scan/list/apple.html',2)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('strawberry','scan/list/strawberry.html',2)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('grapes','scan/list/grapes.html',2)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('tamarind','scan/list/tamarind.html',2)");
      tx.executeSql("INSERT  INTO fruitlist (fruitname,url,status) VALUES ('star fruit','scan/list/starfruit.html',2)");

      console.log("Fruits Inserted");



    });
});
