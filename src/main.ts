import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { AuthInterceptorFn } from './app/core/interceptors/jwt-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([AuthInterceptorFn]) 
    )
  ]
}).catch(err => console.error(err));
