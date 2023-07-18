import { Injectable } from '@angular/core';
import { APIService} from "../../API.service";

@Injectable({
  providedIn: 'root'
})
export class AmplifyService {

  constructor(private _amplifyApi: APIService) { }

  public saveValue(inputValue: string) {
   return this._amplifyApi.EnterValue({
      dimension: 'test',
      measure_value: inputValue!,
      measure_name: 'value',
    })
  }

  public enteredValueListener() {
    return this._amplifyApi.OnEnteredValueListener
  }
}
