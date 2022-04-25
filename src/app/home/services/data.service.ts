import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../shared/services/crud.service";
import {environment} from "../../../environments/environment";
import {List} from "../model/list.model";

@Injectable({
  providedIn: 'root'
})
export class DataService extends CrudService<List>{
  resourceName = environment.response;

  constructor(protected http: HttpClient) {
    super(http)
  }
}
