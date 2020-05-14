import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthAction from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        // only this action will trigger the effect
        ofType(AuthAction.LOGIN_START),
        // create new observable
        switchMap((authData: AuthAction.LoginStart) => {
            return this.httpClient.post<AuthResponse>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(map(resData => {
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                return new AuthAction.Login({
                    email: resData.email,
                    localId: resData.localId,
                    idToken: resData.idToken,
                    expirationDate: expirationDate
                });
            }),
                catchError(error => {
                    return of();
                }));
        })
    );

    @Effect({ dispatch: false })
    authSuccess = this.actions$.pipe(ofType(AuthAction.LOGIN), tap(() => {
        this.router.navigate(['recettes']);
    }));

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private router: Router
    ) { }
}
