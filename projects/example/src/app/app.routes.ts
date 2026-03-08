import { Routes } from '@angular/router';
import {
  HelpListComponent,
  NewItemHelpComponent,
} from '@doroteati/mia-help-editor';
import {
  HomeHelpComponent,
  MiaHelpDetailPageConfig,
  MiaHelpHomePageConfig,
  TopicViewHelpComponent,
} from '@doroteati/mia-help-viewer';

export const routes: Routes = [
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
      secondText:
        'A continuación, podrás encontrar un listado de opciones mediante las cuales podemos ayudarte. Para más información o alguna inquietud adicional no dudes en utilizar nuestros canales de atención.',
      pathDetail: '/viewer/detail',
    } as MiaHelpHomePageConfig,
  },
  {
    path: 'viewer/detail/:id',
    component: TopicViewHelpComponent,
    data: {
      titleHome: 'Centro de Ayuda',
      pathHome: '/viewer/home',
    } as MiaHelpDetailPageConfig,
  },
];
