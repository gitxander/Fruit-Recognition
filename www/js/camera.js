
    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for Cordova to connect with the device
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      //var smallImage = document.getElementById('smallImage');

      // Unhide image elements
      //s
      //smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      //smallImage.src = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: Camera.DestinationType.FILE_URI });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    // function getPhoto(source) {
    //   // Retrieve image file location from specified source
    //   navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    //     destinationType: destinationType.FILE_URI,
    //     sourceType: source });
    // }

    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }


    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }

    function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(imageURI, "http://localhost:8027/public_html/camfind/ajax_upload.php", win, fail, options);
            alert(imageURI);
        }

  function exitapp(){
    var ans = confirm("Exit app?");
    if(ans == true){
      navigator.app.exitApp();
    }
  }

  function snapPicture() {
      //alert('Launching System Camera');
      navigator.camera.getPicture (onSuccess, onFail,
          { quality: 100,
            sourceType: navigator.camera.PictureSourceType.CAMERA,
            mediaType: navigator.camera.MediaType.PICTURE,
            destinationType: destinationType.FILE_URI,
            encodingType: navigator.camera.EncodingType.JPEG,
            correctOrientation: false,
            saveToPhotoAlbum: true
      });

      //A callback function when snapping picture is success.
      function onSuccess (imageData) {
          var image = document.getElementById ('smallImage');
          alert("Image path : "+imageData);
          image.style.display = 'block';
          image.src =  imageData;
      }

      //A callback function when snapping picture is fail.
      function onFail (message) {
          console.log('Error occured: ' + message);
      }
  }
