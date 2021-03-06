import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private jwt: JwtService, private service: UserService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.jwt.getAccessToken()) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.jwt.getAccessToken()}`
                }
            });
            return next.handle(clonedReq).pipe(
                tap(
                    succ => { },
                    err => {
                        if (err.status === 401) {
                            this.jwt.clearData();
                            this.router.navigateByUrl('/user/login');
                        }
                    }
                )
            );
        }
        else
            return next.handle(req.clone());
    }
}
