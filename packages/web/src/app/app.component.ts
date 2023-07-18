import { Component, OnDestroy, OnInit } from '@angular/core';
import { ZenObservable } from 'zen-observable-ts';

import { __SubscriptionContainer, APIService, SubscriptionResponse } from './API.service';
import {BehaviorSubject, of} from 'rxjs';
import { InputValueService } from "./services/input-service/input.value.service";
import { AmplifyService } from "./services/amplify-service/amplify.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
  public historyValueList: any[] = [];
  public inputValue: number | null = null;

  public currentData: { value: string, time: string } | null = null;
  private currentDataSubscription: ZenObservable.Subscription;

  public loadingHistoryList$ = new BehaviorSubject<boolean>(false);
  public loadingCurrentInputValue$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly _amplifyServiceApi: AmplifyService,
    private _inputValueService: InputValueService) {}

  public async ngOnInit() {
    await this.loadLastValue();
  }

  public async loadLastValue(): Promise<void> {
    try {
      const value = await this._inputValueService.getLastValue().toPromise();
      this.currentData = { value: value.measure_value, time: value.time };
    } catch (error: any) {
      console.error(error.message);
      throw of(null)
    }

    this.currentDataSubscription = this._amplifyServiceApi.enteredValueListener()
      .subscribe({
        next: (value: SubscriptionResponse<Pick<__SubscriptionContainer, "onEnteredValue">>) => {
          this.currentData = {
            value: value.value.data?.onEnteredValue.measure_value!,
            time: new Date(+value.value.data?.onEnteredValue.time!).toLocaleString(),
          };
          if (this.historyValueList.length) {
            this.getHistory();
          }
        },
        error: (error) => console.log('getLastValue error: ', error),
      });
  }


  public onSubmitValue(): void {
    const inputValue = this.inputValue?.toString();
    this.loadingCurrentInputValue$.next(true);
    console.log(inputValue)
    if (inputValue) {
      this._amplifyServiceApi.saveValue(inputValue)
        .then(() => console.log('Value saved!'))
        .catch((error) => console.error(error.message))
        .finally(() => this.loadingCurrentInputValue$.next(false));
    }
  }

  public getHistory(): void {
    this.loadingHistoryList$.next(true);
    this.historyValueList = [];
    this._inputValueService.getHistory().subscribe({
      next: (response: any) => {
        for (const property in response) {
          if (!['headers', 'cookies'].includes(property)) {
            const data = response[property].Data;
            const value = data[3].ScalarValue;
            const time = new Date(data[2].ScalarValue).toLocaleString();
            this.historyValueList.push({ value, time });
          }
        }
        this.loadingHistoryList$.next(false);
      },
      error: (error) => {
        console.error('Error fetching history:', error.message);
        this.loadingHistoryList$.next(false);
      },
    });
  }

  public ngOnDestroy(): void {
    if (this.currentDataSubscription)
      this.currentDataSubscription.unsubscribe();
  }
}
