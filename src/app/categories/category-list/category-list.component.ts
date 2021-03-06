import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/categories/category.service'
import { ICategory } from '../category';


@Component({
  selector: 'app-category-list',
  template: `
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Categories
          </h1>
        </div>
      </div>
    </section>
    <div>    
    <section class="hero is-info">
     
          <a routerLink="/categories/create">Create new Category</a>
     
    </section>
    <div>
    
    </div>
    <section class="section">
      <div *ngIf="categories">
          <div *ngFor="let cat of categories">
            <div class="container">
              <h2 class="title">
                <a routerLink="/categories/{{ cat.categoryId }}">{{ cat.name }}</a></h2>
              <h3 class="subtitle">
              {{ cat.description }}
              </h3>
            </div>
          </div>
      </div>
  </section>
  `,
  styles: [
  ]
})
export class CategoryListComponent implements OnInit {
  categories: ICategory[]

  constructor(private catService: CategoryService) { }

  ngOnInit(): void {
    this.catService.getCategories()
      .subscribe(data => this.categories = data)
  }
}
