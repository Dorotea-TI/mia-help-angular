import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpListComponent } from 'projects/agencycoda/mia-help-editor/src/lib/pages/help-list/help-list.component';
import { NewItemHelpComponent } from 'projects/agencycoda/mia-help-editor/src/public-api';
import { HomeHelpComponent, MiaHelpDetailPageConfig, MiaHelpHomePageConfig, TopicViewHelpComponent } from 'projects/agencycoda/mia-help-viewer/src/public-api';

const routes: Routes = [
  { path: '', component: HelpListComponent },
  { path: 'help/new-item', component: NewItemHelpComponent },
  { path: 'help/new-item/:id', component: NewItemHelpComponent },
  { 
    path: 'viewer/home', 
    component: HomeHelpComponent,
    data: {
      titlePage: 'Centro de ayuda',
      backgroundImageHeader: '/assets/img/bg-section/apartment.jpg',
      firstText: 'Hola! ¿en qué podemos ayudarte hoy?',
      secondText: 'A continuación, podrás encontrar un listado de opciones mediante las cuales podemos ayudarte. Para más información o alguna inquietud adicional no dudes en utilizar nuestros canales de atención.',
      pathDetail: '/viewer/detail/'
    } as MiaHelpHomePageConfig
  },
  { 
    path: 'viewer/detail/:id', 
    component: TopicViewHelpComponent,
    data: {
      titleHome: 'Centro de Ayuda',
      pathHome: '/viewer/home'
    } as MiaHelpDetailPageConfig
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
