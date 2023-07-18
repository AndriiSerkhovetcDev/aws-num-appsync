import { Injectable } from '@angular/core';
import {Observable as RxJsObservable} from "rxjs/internal/Observable";
import {take} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InputValueService {
  private _url = 'https://hxbbw2r7jh.execute-api.eu-central-1.amazonaws.com';
  constructor(private _http: HttpClient) { }

  public getHistory(): RxJsObservable<any> {
    return this._http.get(this._url + '/getHistory')
      .pipe(take(1));
  }

  public getLastValue(): RxJsObservable<any> {
    return this._http.get(this._url + '/getLastValue')
      .pipe(take(1));
  }
}
