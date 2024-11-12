import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthJwtService } from '../services/auth-jwt.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthJwtService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('AuthToken');
    let clonedRequest = req;

    // Aggiunge il token di autenticazione alla richiesta
    if (authToken) {
      clonedRequest = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.authService.refreshToken().pipe(
            switchMap((newToken: string) => {
              this.isRefreshing = false;
              return next.handle(this.addTokenHeader(req, newToken));
            }),
            catchError(err => {
              this.isRefreshing = false;
              this.authService.logout();
              return throwError('Sessione scaduta. Effettua di nuovo il login.');
            })
          );
        }
        return throwError(error);
      })
    );
  }

  // Aggiunge l'Authorization header con il nuovo token
  private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
  }
}
