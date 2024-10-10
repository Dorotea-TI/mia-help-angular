import { Inject, Injectable } from '@angular/core';
import { MiaHelp } from '../entities/mia_help';
import { HttpClient } from '@angular/common/http';
import {
  MIA_CORE_PROVIDER,
  MiaBaseCrudHttpService,
  MiaCoreConfig,
} from '@doroteati/mia-core';

@Injectable({
  providedIn: 'root',
})
export class MiaHelpService extends MiaBaseCrudHttpService<MiaHelp> {
  constructor(
    @Inject(MIA_CORE_PROVIDER) protected config: MiaCoreConfig,
    protected http: HttpClient
  ) {
    super(config, http);
    this.basePathUrl = config.baseUrl + 'mia-help';
  }
}
