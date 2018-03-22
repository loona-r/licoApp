import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/Observable/of";
import { tap } from "rxjs/operators";
import { Storage } from "@ionic/storage";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/fromPromise";

@Injectable()
export class DataProvider {
  wordData: any;
  constructor(public http: HttpClient, private stor: Storage) {
    this.wordData = [];
  }

  getWordList(): Observable<any> {
    return Observable.fromPromise(this.stor.get("wordData")).mergeMap(
      (val: any) => {
        if (val == null) {
          return this.http
            .get("https://lico-prankphone.firebaseio.com/PrankPhone.json")
            .pipe(
              tap(res => {
                this.wordData = res.Mots;
              })
            );
        } else {
          this.wordData = val.Mots;
          return of({ Mots: this.wordData });
        }
      }
    );
  }
}
