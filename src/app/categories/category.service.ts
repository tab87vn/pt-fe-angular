import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators'
import { ICategory, ICategoryWithItems, IBaseCategory } from './category';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CategoryService {

  url = 'https://localhost:5001/api'

  headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient) { }

  // get categories
  // getCategories(): Observable<ICategory[]>{
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}/categories`)
    // return this.http
    //   .get<IServerCategory[]>(`${this.url}/categories`)
    //   .pipe(map(o => o.map((cat): ICategory => ({
    //       id: cat.CategoryId,
    //       name: cat.Name,
    //       description: cat.Description,
    //       itemsCount: cat.ItemsCount
    //   })))
    // );
  }

  getCategory(catId: number): Observable<ICategoryWithItems> {
    // return { cat_id: 1, name: "Hello world", desc: "just a name" }
    return this.http.get<ICategoryWithItems>(`${this.url}/categories/${catId}/items`)
  }

  createCategory(cat: IBaseCategory): Observable<IBaseCategory> {
    
    return this.http.post<IBaseCategory>(`${this.url}/categories`, cat, this.httpOptions)
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError))
  }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

}
