import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ImageCropperComponent} from 'ng2-img-cropper';
import { AngularCropperjsModule } from 'angular-cropperjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    AngularCropperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
