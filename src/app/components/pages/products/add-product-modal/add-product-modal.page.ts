import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.page.html',
  styleUrls: ['./add-product-modal.page.scss'],
})
export class AddProductModalPage implements OnInit {

  productForm: FormGroup
  
  product_tags = ['Grains', 'Candies', 'Canned', 'Drinks']

  constructor( private modalCrtl : ModalController,
               private formBuilder: FormBuilder,
               private camera : Camera ) { }


  ngOnInit() {
    this.generateForm();
  }

  dimissModal(){
    this.modalCrtl.dismiss();
  }

  generateForm(){
    this.productForm = this.formBuilder.group({
      productName   : ['', [Validators.required, Validators.maxLength(15)]],
      description   : ['', [Validators.maxLength(20), Validators.required]],
      estimatedCost : ['', Validators.required],
      tag           : ['', Validators.required]
    })
  }

  cameraOptions : CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }


  onUpload(){
    this.camera.getPicture(this.cameraOptions).then( imgData => {
      console.log(imgData)
    })
  }


}
