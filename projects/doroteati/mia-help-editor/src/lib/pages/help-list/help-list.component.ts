import { MiaCategoryModalService } from '@doroteati/mia-category-editor';
import { MiaCategoryService } from '@doroteati/mia-category-core';
import { MiaQuery, nil } from '@doroteati/mia-core';
import { MiaField, MiaFormConfig } from '@doroteati/mia-form';
import { MiaHelp, MiaHelpService } from '@doroteati/mia-help-core';
import { MiaLanguageService } from '@doroteati/mia-language-core';
import {
  MiaPageCrudComponent,
  MiaPageCrudConfig,
} from '@doroteati/mia-layout';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HelpfulColumnComponent } from '../../columns/helpful-column/helpful-column.component';

interface MiaPageCrudLike {
  loadItems(): void;
  openForm(item: any): Observable<any>;
  onClickRemove(item: any): void;
}

@Component({
  selector: 'lib-help-list',
  templateUrl: './help-list.component.html',
  styleUrls: ['./help-list.component.css'],
  standalone: true,
  imports: [MiaPageCrudComponent],
})
export class HelpListComponent implements OnInit {
  @ViewChild('pageComp') pageComp!: MiaPageCrudLike;

  config = new MiaPageCrudConfig();

  lang = 'en';
  readonly languageOptions: Array<{ id: number; title: string }> = [];
  readonly categoryOptions: Array<{ id: number; title: string }> = [];

  constructor(
    protected route: ActivatedRoute,
    protected helpService: MiaHelpService,
    protected categoryModal: MiaCategoryModalService,
    protected languageService: MiaLanguageService,
    protected categoryService: MiaCategoryService,
    protected navigator: Router
  ) {}

  ngOnInit(): void {
    this.loadParams();
    this.loadSelectOptions();
  }

  onSearch(text: string) {
    this.config.tableConfig.query.resetWhere();
    if (text.length > 2) {
      this.config.tableConfig.query.addWhereLikes(['title'], text);
    }
    this.pageComp.loadItems();
  }

  onAction(action: { key: string; item: any }) {
    if (action.key == 'add') {
      const newItem = new MiaHelp();
      newItem.status = 1;
      this.pageComp
        .openForm(newItem)
        .pipe(nil())
        .subscribe((result) => this.pageComp.loadItems());
    } else if (action.key == 'search') {
      this.onSearch(action.item);
    } else if (action.key == 'edit') {
      this.pageComp
        .openForm(action.item)
        .pipe(nil())
        .subscribe((result) => this.pageComp.loadItems());
      //this.navigator.navigateByUrl('/help/new-item/' + action.item.id);
    } else if (action.key == 'remove') {
      this.pageComp.onClickRemove(action.item);
    } else if (action.key == 'click-status') {
      this.saveNewStatus(action.item, action.item.status == 1 ? 0 : 1);
    } else if (action.key == 'organize') {
      this.categoryModal.openOrganize(1);
    }
  }

  saveNewStatus(item: MiaHelp, newStatus: number) {
    item.status = newStatus;
    this.helpService.saveOb(item).subscribe();
  }

  loadTableConfig() {
    this.config.tableConfig.query.addWith('category');
    this.config.tableConfig.query.addWith('language');

    this.config.tableConfig.loadingColor = 'black';
    this.config.tableConfig.hasEmptyScreen = false;
    this.config.tableConfig.service = this.helpService;
    this.config.tableConfig.columns = [
      { key: 'id', type: 'string', title: '#', field_key: 'id' },
      {
        key: 'title',
        type: 'string',
        title: this.lang == 'es' ? 'Titulo' : 'Title',
        field_key: 'title',
      },
      {
        key: 'category',
        type: 'string',
        title: this.lang == 'es' ? 'Categoría' : 'Category',
        field_key: ['category', 'title'],
      },
      {
        key: 'helpful',
        type: 'custom',
        title: this.lang == 'es' ? 'Util' : 'Helpful',
        extra: { component: HelpfulColumnComponent },
      },
      {
        key: 'language',
        type: 'string',
        title: this.lang == 'es' ? 'Idioma' : 'Language',
        field_key: ['language', 'title'],
      },
      {
        key: 'visibility',
        type: 'icon-toggle',
        title: '',
        field_key: 'status',
        extra: {
          key_action: 'click-status',
          options: [
            { value: 0, color: '#333', icon: 'visibility-off' },
            { value: 1, color: 'blue', icon: 'visibility' },
          ],
        },
      },
      {
        key: 'more',
        type: 'more',
        title: '',
        extra: {
          actions: [
            {
              icon: 'create',
              title: this.lang == 'es' ? 'Editar' : 'Edit',
              key: 'edit',
            },
            {
              icon: 'delete',
              title: this.lang == 'es' ? 'Eliminar' : 'Delete',
              key: 'remove',
            },
          ],
        },
      },
    ];
  }

  loadFormConfig() {
    this.config.formConfig.titleNew =
      this.lang == 'es' ? 'Agregar item' : 'Add new item';
    this.config.formConfig.titleEdit =
      this.lang == 'es' ? 'Editar' : 'Edit item';
    this.config.formConfig.service = this.helpService;
    this.config.formConfig.config = new MiaFormConfig();
    this.config.formConfig.config.hasSubmit = false;
    this.config.formConfig.config.fields = [
      {
        key: 'language_id',
        type: MiaField.TYPE_SELECT,
        label: this.lang == 'es' ? 'Idioma' : 'Languaje',
        validators: [Validators.required],
        extra: {
          options: this.languageOptions,
        },
      },
      {
        key: 'category_id',
        type: MiaField.TYPE_SELECT,
        label: this.lang == 'es' ? 'Categoria' : 'Category',
        validators: [Validators.required],
        extra: {
          options: this.categoryOptions,
        },
      },
      {
        key: 'title',
        type: MiaField.TYPE_STRING,
        label: this.lang == 'es' ? 'Titulo' : 'Title',
        validators: [Validators.required],
      },
      {
        key: 'content',
        type: MiaField.TYPE_HTML,
        label: this.lang == 'es' ? 'Contenido' : 'Content',
        extra: {
          height: 280,
          theme: 'snow',
        },
      },
      {
        key: 'status',
        type: MiaField.TYPE_SELECT,
        label: this.lang == 'es' ? 'Estado' : 'Status',
        extra: {
          options: [
            { id: 0, title: this.lang == 'es' ? 'Inactivo' : 'Inactive' },
            { id: 1, title: this.lang == 'es' ? 'Activo' : 'Active' },
          ],
        },
      },
    ];
    this.config.formConfig.config.errorMessages = [
      {
        key: 'required',
        message:
          this.lang == 'es'
            ? 'El "%label%" es requerido.'
            : 'The "%label%" is required.',
      },
    ];
  }

  loadConfig() {
    this.config.title = this.lang == 'es' ? 'Centro de Ayuda' : 'Help Center';

    //this.config.buttons.push({ key: 'organize', title: 'Organize' });
    this.config.buttons.push({
      key: 'add',
      title: this.lang == 'es' ? 'Agregar' : 'Add new Item',
    });

    this.loadTableConfig();
    this.loadFormConfig();
  }

  loadParams() {
    this.route.data
      .pipe(
        tap((params) => {
          if (params && params['lang']) {
            this.lang = params['lang'];
          }
        })
      )
      .subscribe((res) => this.loadConfig());
  }

  loadSelectOptions() {
    const languageQuery = new MiaQuery();
    languageQuery.itemPerPage = 5000;
    const categoryQuery = new MiaQuery();
    categoryQuery.itemPerPage = 5000;

    forkJoin({
      languages: this.languageService.listWithExtras(languageQuery, {}).pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([]))
      ),
      categories: this.categoryService.listWithExtras(categoryQuery, {}).pipe(
        map((response) => response?.data ?? []),
        catchError(() => of([]))
      ),
    }).subscribe(({ languages, categories }) => {
      this.replaceOptions(this.languageOptions, languages);
      this.replaceOptions(this.categoryOptions, categories);
    });
  }

  replaceOptions(
    target: Array<{ id: number; title: string }>,
    items: Array<any>
  ) {
    target.splice(
      0,
      target.length,
      ...items.map((item) => ({
        id: item.id,
        title: item.title ?? '',
      }))
    );
  }
}
