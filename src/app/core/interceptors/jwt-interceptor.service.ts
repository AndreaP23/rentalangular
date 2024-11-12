import { HttpInterceptorFn } from '@angular/common/http';

 export const AuthInterceptorFn: HttpInterceptorFn = (request, next) => {
  const authToken = sessionStorage.getItem("AuthToken") || localStorage.getItem("AuthToken");

  console.log('AuthInterceptorFn in esecuzione');

  // Verifico il token, con il log controllo il token trovato
  if (authToken) {
    //console.log('AuthToken trovato:', authToken);
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: authToken  
      }
    });
    //console.log('Richiesta clonata con header Authorization:', clonedRequest.headers.get('Authorization'));
    return next(clonedRequest);
  } else {
    console.warn('Token non trovato o utente non loggato');
  }

  return next(request);
};

//Refresh
