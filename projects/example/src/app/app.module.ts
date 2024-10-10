import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MiaHelpEditorModule } from 'projects/doroteati/mia-help-editor/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiaHelpViewerModule } from 'projects/doroteati/mia-help-viewer/src/public-api';
// Dependencias de Dorotea
import { MiaLayoutModule } from '@doroteati/mia-layout';
import {
  MIA_CORE_PROVIDER,
  MIA_GOOGLE_STORAGE_PROVIDER,
} from '@doroteati/mia-core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MiaLayoutModule,
    MiaHelpEditorModule,
    BrowserAnimationsModule,
    MiaHelpViewerModule,
  ],
  providers: [
    {
      provide: MIA_CORE_PROVIDER,
      useValue: {
        baseUrl: 'https://dorotea-interno.uc.r.appspot.com/',
        //baseUrl: 'http://0.0.0.0:8080/'
      },
    },
    {
      provide: MIA_GOOGLE_STORAGE_PROVIDER,
      useValue: {
        bucket: 'iba-files',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
