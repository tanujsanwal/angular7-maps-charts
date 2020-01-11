import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private _storage: StorageService,
    private _router: Router,
    private _http: HttpClient
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      setHeaders: {
        Accept: 'application/json',
      }
    });

    if(!req.url.match('/auth')) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+ this._storage.getToken(),
          Accept: 'application/json'
        }
      })
    }

    return next.handle(req).pipe(
      catchError((res) => {
        if (!req.url.includes('auth/token-refresh') && res.status === 401) {
          return this.handle401Error(req, next);
        }
        return throwError(res);
      })
    );
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.refreshToken().pipe(switchMap((data: any) => {
      if (data.token) {
        this._storage.setToken(data.token);
      }
      const clonedRequestRepeat = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this._storage.getToken())
      });
      return next.handle(clonedRequestRepeat);
    }), catchError((error) => {
      this._router.navigate(['login']);
      return next.handle(error);
    }));
  }

  refreshToken() {
    const url = environment.url_endpoint + environment.api_endpoint + 'auth/token-refresh';
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer '+this._storage.getToken()
      })
    };
    return this._http.post(url, null, httpOptions);
  }
}
