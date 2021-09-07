import { AuthInterceptor } from './auth-interceptor';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

// importar no app.module

export const httpInterceptorsProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
];