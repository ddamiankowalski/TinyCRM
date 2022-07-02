import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from "rxjs";

interface backendRequestParams {
  route: string;
  method?: 'GET' | 'POST';
  params?: any;
  body?: any;
  headers?: any;
}

@Injectable({
  providedIn: 'root',
})
export class Backend {
  constructor(public http: HttpClient) {}

  public backendUrl: string = "http://127.0.0.1:8000/api";

  public getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/json");
    return headers;
}

  public postRequest(route: string="", body: any={}, responseSubject?: Subject<any>): Observable<any> {
    if(!responseSubject) {
      responseSubject = new Subject<any>();
    }

    this.http.post(
      this.backendUrl + '/' + encodeURI(route),
      body,
      {headers: this.getHeaders()}
    ).subscribe(
      (res) => {
        responseSubject?.next(res);
        responseSubject?.complete();
      },
      (err) => {
        responseSubject?.error(err.error.message)
      }
    )
    return responseSubject.asObservable();
  }
}
