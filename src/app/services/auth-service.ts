import { Injectable } from "@angular/core"
import { environment } from "../../evironments/environment";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly BASE_ROUTE = '/api/auth';
    private readonly API_URL = environment.API_URL;

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string){
    return this.httpClient.post<any>(this.API_URL+this.BASE_ROUTE + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
        this.router.navigate(['/notes']);
      })
    )
  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<any>(this.API_URL+this.BASE_ROUTE+ "/register", { name, email, password });
  }
}