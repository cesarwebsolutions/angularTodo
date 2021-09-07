
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

   async loginService(user: any) {
    // return new Promise((resp) => {
    //   window.localStorage.setItem('token', 'meu-token');
    //   resp(true);
    // });
    const resultado = await this.http.post<any>(`${environment.baseUrl}/login`, user).toPromise();
    if(resultado && resultado.jwt) {
      window.localStorage.setItem('token', resultado.jwt);
      return true;
    }
    return false;

  }

  async createAccountService(account: any) {
    // return new Promise((resp) => {
    //   resp(true);
    // });
    const resultado = await this.http.post<any>(`${environment.baseUrl}/cadastrar`, account).toPromise();
    return resultado;
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date{
    const decoded: any = jwt_decode.default(token);

    if(decoded.exp === undefined){
      return null!;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) {
      return true
    }

    const date = this.getTokenExpirationDate(token);
    if(date === undefined){
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isuserLoggedIn(){
    const token = this.getAuthorizationToken();
    if(!token) {
      return false;
    } else if(this.isTokenExpired(token)){
      return false;
    } else {
      return true;
    }
  }

}
