import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, OperatorFunction } from "rxjs";
import { environment } from "../../evironments/environment";
import { NoteDto } from "../dto/note-dto";
import { NoteStatus } from "../enum/note-status";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private readonly BASE_ROUTE = '/api/tasks';
  private readonly API_URL = environment.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  private getHeaders(): { [header: string]: string } {
    const headers: { [header: string]: string } = {};
    const authToken = sessionStorage.getItem('auth-token');
    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }
    return headers;
  }

  private throwErrorDefault(): OperatorFunction<any, any> {
    return catchError((error: any) => {
      if (error.status === 401 || error.status === 403) {
        console.error('Unauthorized access - redirecting to login');
        // Here you can redirect to the login page or handle unauthorized access
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('username');
        this.router.navigate(['/login']);
      }
      throw error;
    }
    );
  }

  public getAll(): Observable<NoteDto[]> {
    return this.http.get<NoteDto[]>(`${this.API_URL}${this.BASE_ROUTE}`, {
      headers: new HttpHeaders(this.getHeaders())
    }).pipe(
      this.throwErrorDefault()
      );
  }

  public save(note: NoteDto): Observable<any> {
    return this.http.post<NoteDto>(`${this.API_URL}${this.BASE_ROUTE}`, note, {
      headers: new HttpHeaders(this.getHeaders())
    });
  }

  public getById(id: string): Observable<NoteDto> {
    return this.http.get<NoteDto>(`${this.API_URL}${this.BASE_ROUTE}/${id}`, {
      headers: new HttpHeaders(this.getHeaders())
    }).pipe(
      this.throwErrorDefault()
      );
  }

  public remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}${this.BASE_ROUTE}/${id}`, {
      headers: new HttpHeaders(this.getHeaders())
    }).pipe(
      this.throwErrorDefault()
      );
  }

  public updateStatus(id: number | null, status: NoteStatus): Observable<any> {
    if (!id) {
      throw new Error('Note not found');
    }
    return this.http.patch(`${this.API_URL}${this.BASE_ROUTE}/${id}/status?status=${status}`, null, {
      headers: new HttpHeaders(this.getHeaders())
    }).pipe(
      this.throwErrorDefault()
      );
  }
}
