import { MiaCategoryService } from '@doroteati/mia-category-core';
import { MiaLanguageService } from '@doroteati/mia-language-core';
import { nil } from '@doroteati/mia-core';
import {
  BoxFieldComponent,
  MiaField,
  MiaFormComponent,
  MiaFormConfig,
} from '@doroteati/mia-form';
import { MiaHelp, MiaHelpService } from '@doroteati/mia-help-core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'lib-new-item-help',
  templateUrl: './new-item-help.component.html',
  styleUrls: ['./new-item-help.component.css'],
})
export class NewItemHelpComponent implements OnInit {
  @ViewChild('miaForm') miaForm!: MiaFormComponent;

  configForm?: MiaFormConfig;
  isSending = false;

  isLoading = false;

  auction = new MiaHelp();

  tabs: Array<{ title: string; fields: Array<MiaField> }> = [];
  sectionSelectedIndex = 0;

  constructor(
    protected route: ActivatedRoute,
    protected navigator: Router,
    protected helpService: MiaHelpService,
    protected languageService: MiaLanguageService,
    protected categoryService: MiaCategoryService
  ) {}

  ngOnInit(): void {
    this.loadConfig();
    this.loadParams();
  }

  processWithBaseService(item: any) {
    let serviceSave: Promise<any> = this.helpService.save(item);
    serviceSave
      .then((result) => {
        this.isSending = false;
      })
      .catch((error) => {
        this.isSending = false;
      });
  }

  save(item: any) {
    if (this.isSending) {
      return;
    }

    this.isSending = true;
    this.processWithBaseService(item);
  }

  onClickSave() {
    this.miaForm.submit().subscribe((result) => {
      this.save(result);
    });
  }

  onClickContinue() {
    this.sectionSelectedIndex++;
    this.onClickTab(
      this.tabs[this.sectionSelectedIndex],
      this.sectionSelectedIndex
    );
  }

  loadAuction(auctionId: number) {
    this.isLoading = true;
    this.helpService
      .fetchWithRelation(auctionId, ['relateds'])
      .pipe(tap((post) => (this.auction = post)))
      .pipe(tap((post) => this.onClickTab(this.tabs[0], 0)))
      .subscribe((res) => (this.isLoading = false));
  }

  loadParams() {
    this.route.params
      .pipe(map((params) => params['id']))
      .pipe(
        tap((auctionId) => {
          if (auctionId == undefined) {
            this.onClickTab(this.tabs[0], 0);
          }
        })
      )
      .pipe(nil())
      .subscribe((auctionId) => this.loadAuction(auctionId as number));
  }

  loadConfig() {
    this.tabs = [
      this.getGeneralTab(),
      {
        title: 'Settings',
        fields: [
          {
            key: 'box-related',
            type: MiaField.TYPE_CUSTOM,
            extra: {
              component: BoxFieldComponent,
              fields: [
                {
                  key: '',
                  type: MiaField.TYPE_LABEL,
                  label: '<h4>Related content</h4>',
                  classes: 'label-form',
                },
                {
                  key: '',
                  type: MiaField.TYPE_LABEL,
                  label:
                    'Connect related content from your News to give readers more to explore.',
                  classes: 'label-form',
                },
              ],
            },
          },

          {
            key: 'box-language',
            type: MiaField.TYPE_CUSTOM,
            extra: {
              component: BoxFieldComponent,
              fields: [
                {
                  key: '',
                  type: MiaField.TYPE_LABEL,
                  label: '<h4>Language</h4>',
                  classes: 'label-form',
                },
                {
                  key: '',
                  type: MiaField.TYPE_LABEL,
                  label: 'Select interface language',
                  classes: 'label-form',
                },
              ],
            },
          },

          {
            key: 'box-visibility',
            type: MiaField.TYPE_CUSTOM,
            extra: {
              component: BoxFieldComponent,
              fields: [
                {
                  key: '',
                  type: MiaField.TYPE_LABEL,
                  label: '<h4>Visibility</h4>',
                  classes: 'label-form',
                },
                {
                  key: '',
                  type: MiaField.TYPE_LABEL,
                  label: 'Loralsk adklsj adklsj lkasj asklj ad ',
                  classes: 'label-form',
                },

                {
                  key: 'visibility',
                  type: 'select',
                  label: 'Estado',
                  extra: {
                    options: [
                      { id: 0, title: 'Not Public' },
                      { id: 1, title: 'Public (default)' },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    ];
  }

  getTabs() {
    return [];
  }

  getGeneralTab() {
    return {
      title: 'Content',
      fields: [
        {
          key: 'box-general',
          type: MiaField.TYPE_CUSTOM,
          extra: {
            component: BoxFieldComponent,
            fields: [
              {
                key: '',
                type: MiaField.TYPE_LABEL,
                label: '<h4>General</h4>',
                classes: 'label-form',
              },
              {
                key: 'title',
                type: MiaField.TYPE_STRING,
                label: 'Titulo',
                placeholder: 'Escribe el titulo aqui',
                caption: '',
                extra: { appearance: 'outline' },
              },
              {
                key: 'content',
                type: MiaField.TYPE_TEXT,
                label: 'Descripcion de la propiedas',
                placeholder: 'Escribe una descripcion aqui',
                caption: '',
                extra: { appearance: 'outline' },
              },
              {
                key: 'code',
                type: MiaField.TYPE_STRING,
                label: 'Key Code',
                placeholder: 'Example: 123-ASD',
                caption: '',
                extra: { appearance: 'outline' },
              },
            ],
          },
        },

        {
          key: 'box-doc',
          type: MiaField.TYPE_CUSTOM,
          extra: {
            component: BoxFieldComponent,
            fields: [
              {
                key: '',
                type: MiaField.TYPE_LABEL,
                label: '<h4>Documentación</h4>',
                classes: 'label-form',
              },
            ],
          },
        },

        {
          key: 'box-specs',
          type: MiaField.TYPE_CUSTOM,
          extra: {
            component: BoxFieldComponent,
            fields: [
              {
                key: '',
                type: MiaField.TYPE_LABEL,
                label: '<h4>Caracteristicas Generales</h4>',
                classes: 'label-form',
              },
            ],
          },
        },
      ],
    };
  }

  onClickTab(tab: { title: string; fields: Array<MiaField> }, index: number) {
    if (this.configForm != undefined) {
      this.miaForm.updateItemByForm();
    }

    let config = new MiaFormConfig();
    config.hasSubmit = false;
    config.fields = tab.fields;
    config.service = this.helpService;
    this.configForm = config;

    this.sectionSelectedIndex = index;
  }

  stopSending() {
    this.isSending = false;
  }
}
