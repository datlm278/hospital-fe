import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl = "http://localhost:8080"

  constructor(private httpClient: HttpClient) {
  }

  public handleError(error: any) {
    return throwError(error.error);
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error("key may not be null if value is Date");
        }
      } else {
        Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }
    return httpParams;
  }

  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object" && !(value instanceof Date)) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }


  public get(endPointUrl: string, optional?: any): Observable<any> {
    let localVarQueryParameters = new HttpParams();

    if (optional !== undefined && optional !== null) {
      localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
        <any>optional, 'optional');
    }

    let urlPath = this.baseUrl + endPointUrl;
    return this.httpClient.get(urlPath, {
      params: localVarQueryParameters
    }).pipe(catchError(this.handleError))
  }

  public post(endpointUrl: string, data?: any, option?: any): Observable<any> {
    let urlPath = this.baseUrl + endpointUrl;
    return this.httpClient.post(urlPath, data, option).pipe(
      catchError(err => {return throwError(err.error);})
    );
  }

  public put(endpointUrl: string, data?: any): Observable<any> {
    const urlPath = this.baseUrl + endpointUrl;
    return this.httpClient.put(urlPath, data).pipe(
      catchError(this.handleError)
    );
  }

  public delete(endpointUrl: string, options?: any): Observable<any> {
    const urlPath = this.baseUrl + endpointUrl;
    return this.httpClient.delete(urlPath, options).pipe(
      catchError(this.handleError)
    );
  }
}
