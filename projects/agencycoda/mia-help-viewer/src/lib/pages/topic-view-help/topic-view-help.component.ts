import { MiaCategory, MiaCategoryService } from '@agencycoda/mia-category-core';
import { MiaPagination, MiaQuery } from '@agencycoda/mia-core';
import { MiaHelp, MiaHelpService } from '@agencycoda/mia-help-core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

export class MiaHelpDetailPageConfig {
  titleHome = 'Help';
  pathHome: string = '/help';
  hasSearch?: boolean = false;
}

@Component({
  selector: 'lib-topic-view-help',
  templateUrl: './topic-view-help.component.html',
  styleUrls: ['./topic-view-help.component.scss']
})
export class TopicViewHelpComponent implements OnInit {

  config?: MiaHelpDetailPageConfig;

  category?: MiaCategory;

  list = new Array<MiaHelp>();
  selectedItem?: MiaHelp;

  isSidebarOpen:boolean = true;

  constructor(
    protected route: ActivatedRoute,
    protected categoryService: MiaCategoryService,
    protected helpService: MiaHelpService,

    public breakpointObserver: BreakpointObserver,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadConfig();


    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isSidebarOpen = false;
        }
    });
  }

  onClickItem(item: MiaHelp) {
    this.selectedItem = item;
  }

  loadItems(category: MiaCategory): Observable<MiaPagination<MiaHelp>> {
    this.category = category;

    let query = new MiaQuery();
    query.addWhere('category_id', category.id);
    query.addOrderAsc('ord');

    return this.helpService.listOb(query);
  }

  loadConfig() {
    this.route.data.subscribe(data => this.config = data as MiaHelpDetailPageConfig);
    this.route.params
    .pipe(switchMap(params => this.categoryService.fetchOb(params['id'])))
    .pipe(switchMap(category => this.loadItems(category)))
    .pipe(tap(data => this.list = data.data))
    .subscribe(data => this.selectedItem = this.list.length > 0 ? this.list[0] : undefined)
  }

  sidebarCloseMobile(){
    if (this.breakpointObserver.isMatched('(max-width: 599px)')) {
      this.isSidebarOpen = false;
    }
  }

}
