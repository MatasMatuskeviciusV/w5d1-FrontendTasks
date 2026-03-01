import {
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../models/app-error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((httpError: HttpErrorResponse) => {
      const appError = normalizeError(httpError);
      console.error('[HTTP Error]', appError);
      return throwError(() => appError);
    })
  );
};

function normalizeError(httpError: HttpErrorResponse): AppError {
  return {
    statusCode: httpError.status,
    message: extractErrorMessage(httpError),
    details: httpError.error,
    timestamp: new Date(),
  };
}

function extractErrorMessage(httpError: HttpErrorResponse): string {
  if (httpError.error?.message) {
    return httpError.error.message;
  }

  if (typeof httpError.error === 'string') {
    return httpError.error;
  }

  if (httpError.statusText) {
    return httpError.statusText;
  }

  return `HTTP Error ${httpError.status}`;
}
