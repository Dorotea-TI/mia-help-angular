import { NgModule } from '@angular/core';

// Agency Coda Libraries
import { MiaLayoutModule } from '@doroteati/mia-layout';

// Components
import { HelpListComponent } from './pages/help-list/help-list.component';
import { HelpfulColumnComponent } from './columns/helpful-column/helpful-column.component';
import { NewItemHelpComponent } from './pages/new-item-help/new-item-help.component';
import { MiaFormModule } from '@doroteati/mia-form';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HelpListComponent,
    HelpfulColumnComponent,
    NewItemHelpComponent,
  ],
  imports: [
    // Angular Libraries
    CommonModule,
    FormsModule,

    // Angular Materia
    MatIconModule,

    // Agency Coda Libraries
    MiaLayoutModule,
    MiaFormModule,
  ],
  exports: [HelpListComponent, HelpfulColumnComponent, NewItemHelpComponent],
})
export class MiaHelpEditorModule {}
