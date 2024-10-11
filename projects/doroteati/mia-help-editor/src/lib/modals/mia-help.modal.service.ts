import {
  MiaField,
  MiaFormConfig,
  MiaFormModalComponent,
  MiaFormModalConfig,
} from '@doroteati/mia-form';
import { MiaHelp, MiaHelpService } from '@doroteati/mia-help-core';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MiaHelpModalService {
  constructor(
    protected categoryService: MiaHelpService,
    protected dialog: MatDialog
  ) {}

  open(category: MiaHelp) {
    let data = new MiaFormModalConfig();
    data.item = category;
    data.service = this.categoryService;
    data.titleNew = 'New Item';
    data.titleEdit = 'Edit Item';

    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = [
      { key: 'title', type: MiaField.TYPE_STRING, label: 'Name Category' },
    ];
    config.errorMessages = [
      { key: 'required', message: 'The "%label%" is required.' },
    ];
    data.config = config;
    return this.dialog
      .open(MiaFormModalComponent, {
        width: '520px',
        panelClass: 'modal-full-width-mobile',
        data: data,
      })
      .afterClosed();
  }
}
