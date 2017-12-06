import {Component, ViewChild, AfterViewChecked } from '@angular/core';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { AngularCropperjsComponent } from 'angular-cropperjs';

declare var Cropper: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {

    name:string;
    data1:any;
    cropperSettings1:CropperSettings;
    data2:any;
    cropperSettings2:CropperSettings;
    croppedWidth:number;
    croppedHeight:number;
    datawidth:any = 400;
    dataheight:any = 400;

    type_file:any;
    size_file:any;

    file_send:any;

    //////////////
    cropperSettings:CropperSettings;
    data:any;
    imagetest:any;

    
    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;
   	@ViewChild('angularCropper') public angularCropper: AngularCropperjsComponent;
    
    constructor() {
      this.name = 'Angular2'

      this.cropperSettings1 = new CropperSettings();

      this.cropperSettings1.noFileInput = true;
      this.cropperSettings1.width = 600;
      this.cropperSettings1.height = 400;

      this.cropperSettings1.croppedWidth = 600;
      this.cropperSettings1.croppedHeight = 400;

      this.cropperSettings1.canvasWidth = 600;
      this.cropperSettings1.canvasHeight = 400;

      this.cropperSettings1.minWidth = 600;
      this.cropperSettings1.minHeight = 400;

      this.cropperSettings1.rounded = false;
      this.cropperSettings1.keepAspect = true;

      this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
      this.cropperSettings1.cropperDrawSettings.strokeWidth = 1;

      this.data1 = {};

      //////////////
      this.cropperSettings = new CropperSettings();
      this.cropperSettings.noFileInput = true;
      this.data = {};
  }
  
  // cropped(bounds:Bounds) {
  //   this.croppedHeight = bounds.bottom-bounds.top;
  //   this.croppedWidth = bounds.right-bounds.left;
  //   console.log(bounds);
  // }

 cropped($event) {
    this.croppedHeight = $event.bottom-$event.top;
    this.croppedWidth = $event.right-$event.left;
    // this.cropperSettings1.croppedWidth = $event.width;
    // this.cropperSettings1.croppedHeight = $event.height;
    // this.datawidth = $event.width;
    // this.dataheight = $event.height;
    // console.log($event);
    // console.log(this.data);
    console.log(this.data);
  }
 

////////

public uploadPhoto($event): void {
    var image = new Image();
    const file: File = $event.target.files[0];
    this.file_send = file;
    const myReader: FileReader = new FileReader();
    const scope = this;

    if (!file) {
      return;
    }

    // If file is bigger than 2mb
    if(file.size>2000000){
    	console.log("File is bigger than 2mb");
    	return;
    }
    
    var filetype = file.type;
     var png = "image/png";

    if(filetype=="image/jpeg"){
    	console.log(file.type);
		addImage();
		// this.imagetest = image;
	 //    console.log(this.imagetest);
	    this.type_file = file.type;
	    this.size_file = file.size;			
    	return;
    } else if(filetype==png){
    	console.log(file.type);
		addImage();
	    this.type_file = file.type;
	    this.size_file = file.size;			
    	return;
    } else {
    	console.log("The specified format is not supported!");
    }

	function addImage(){
	    myReader.onloadend = function (loadEvent: any) {
	      image.src = loadEvent.target.result;
	      scope.cropper.setImage(image)
	      image.onload = function () {
	         console.log(image.width + " " + image.height);
	      };
	    };

	    myReader.readAsDataURL(file);
	}

  }

  onDrop(){
  	console.log("dropping is working!");
  }

  AddImage(){
  	console.log("Image ADDED!1");
  }

  PostImage(ev){
  	// var dt = ev.dataTransfer;
  	// console.log(dt);
  	console.log("Image Posted!");
  	// this.apiPostImage("localhost:3000",this.file_send);
  	this.apiPostImage();
  }

  CancelImg(){
  	var test = document.getElementById('crop1');
  	// test.remove();
  	// this.cropper.inputImage = "";
  }

  apiPostImage() {

	var xhr = new XMLHttpRequest(),
	    method = "POST",
	    // url = "http://doubleti.net:3007";
	    url = "http://localhost:3000";

	var formData = new FormData();    

	formData.append("file_test",this.file_send);

	console.log(formData);

	var object_image = {
		"file": this.file_send,
		"image": this.data.image
	}

	// console.log(this.file_send);

	xhr.open(method, url, true);
	// xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
	// xhr.setRequestHeader('Content-Type', 'application/json');
	var contentType = "multipart/form-data;"
    xhr.setRequestHeader("Content-Type", contentType);
    // xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = function () {
	  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
	    console.log(xhr.responseText);
	  }
	};
	xhr.send(formData);

  	// let xhr: XMLHttpRequest = new XMLHttpRequest();

  	//       xhr.open('POST', url, true);
   //    // xhr.setRequestHeader('Authorization', this.token.access_token);

   //    let formData = new FormData();

   //    if (file) {
   //      formData.append(file, file.name);
   //    }

   //    xhr.send(formData);
  }  

dragover_handler(ev) {
  console.log("dragOver");
  // Prevent default select and drag behavior
  ev.preventDefault();
}

drop_handler(ev) {
  console.log("Drop");
  ev.preventDefault();
  // If dropped items aren't files, reject them
  var dt = ev.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i=0; i < dt.items.length; i++) {
      if (dt.items[i].kind == "file") {
        var f = dt.items[i].getAsFile();
        console.log(dt);
        console.log("... file[" + i + "].name = " + f.name);
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i=0; i < dt.files.length; i++) {
      console.log(dt);
      console.log("... file[" + i + "].name = " + dt.files[i].name);
    }
  }
}

dragend_handler(ev) {
  console.log("dragEnd");
  // Remove all of the drag data
  var dt = ev.dataTransfer;
  if (dt.items) {
    // Use DataTransferItemList interface to remove the drag data
    for (var i = 0; i < dt.items.length; i++) {
      dt.items.remove(i);
    }
  } else {
    // Use DataTransfer interface to remove the drag data
    ev.dataTransfer.clearData();
  }
}  

 ngAfterViewChecked(){

 }


}

