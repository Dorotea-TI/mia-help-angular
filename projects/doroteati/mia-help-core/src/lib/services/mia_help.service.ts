import { Injectable } from '@angular/core';
import { MiaHelp } from '../entities/mia_help';
import { MiaBaseCrudHttpService } from '@doroteati/mia-core';

@Injectable({
  providedIn: 'root',
})
export class MiaHelpService extends MiaBaseCrudHttpService<MiaHelp> {
  constructor() {
    super();
    this.basePathUrl = this.config.baseUrl + 'mia-help';
  }
}
