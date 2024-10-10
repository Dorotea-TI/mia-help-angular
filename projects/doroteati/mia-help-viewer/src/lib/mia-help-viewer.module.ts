import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { HomeHelpComponent } from './pages/home-help/home-help.component';
import { TopicViewHelpComponent } from './pages/topic-view-help/topic-view-help.component';


@NgModule({
  declarations: [
    HomeHelpComponent,
    TopicViewHelpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatDividerModule
  ],
  exports: [
    HomeHelpComponent,
    TopicViewHelpComponent
  ]
})
export class MiaHelpViewerModule { }
