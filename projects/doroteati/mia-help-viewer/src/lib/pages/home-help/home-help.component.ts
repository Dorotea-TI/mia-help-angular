import { MiaCategory, MiaCategoryService } from '@doroteati/mia-category-core';
import { MiaQuery } from '@doroteati/mia-core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export class MiaHelpHomePageConfig {
  titlePage = '';
  backgroundImageHeader?: string = '';
  hasSearch?: boolean = false;
  firstText?: string = '';
  secondText?: string = '';
  pathDetail: string = '/help/';
}

@Component({
  selector: 'lib-home-help',
  templateUrl: './home-help.component.html',
  styleUrls: ['./home-help.component.scss'],
})
export class HomeHelpComponent implements OnInit {
  config?: MiaHelpHomePageConfig;

  categories?: Array<MiaCategory | any>;

  constructor(
    protected route: ActivatedRoute,
    protected categoryService: MiaCategoryService
  ) {}

  ngOnInit(): void {
    this.loadConfig();
    this.loadCategories();
  }

  loadCategories() {
    let query = new MiaQuery();
    query.addOrderAsc('ord');
    query.addWhere('status', 1);

    this.categoryService
      .listOb(query)
      .subscribe((res) => (this.categories = res.data));
  }

  loadConfig() {
    this.route.data.subscribe(
      (data) => (this.config = data as MiaHelpHomePageConfig)
    );
  }
}
