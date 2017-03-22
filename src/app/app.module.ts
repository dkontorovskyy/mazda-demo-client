import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FormComponentComponent } from './form-component/form-component.component';
import {MaterialModule} from "@angular/material";
import { SpinnerButtonComponent } from './spinner-button/spinner-button.component';
import {SpeechRecognitionService} from "./speech-service/speach-recognition.service";
import { SpeechComponentComponent } from './speech-component/speech-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent,
    SpinnerButtonComponent,
    SpeechComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [SpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
