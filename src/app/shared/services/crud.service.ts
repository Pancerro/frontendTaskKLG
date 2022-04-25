import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};

export const httpPatchOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/merge-patch+json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {
  resourceName: string = '';

  constructor(protected http: HttpClient) { }

  getModels() {
    return this.http.get<T[]>(this.resourceName, httpOptions);
  }

  getModel(id: number) {
    return this.http.get<T>(`${this.resourceName}/${id}`, httpOptions);
  }

  saveModel(model: T, id: number) {
    if (id) {
      return this.http.patch<T>(`${this.resourceName}/${id}`, model, httpPatchOptions);
    }
    return this.http.post<T>(this.resourceName, model, httpOptions);
  }

  deleteModel(model: any) {
    return this.http.delete(`${this.resourceName}/${model.id}`, httpOptions);
  }
}
