import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from '../Models/Interfaces/IStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {




  public apiUrl: string = 'http://localhost:5187/api/Student';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.apiUrl);
  }
  getFilteredStudents(searchTerm: string): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.apiUrl}/SearchStudents?p_searchLetters=${searchTerm}`);
  }
  getStudentsPerPage(page: number, pageSize: number): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.apiUrl}/StudentsPerPage?pageNumber=${page}&pageSize=${pageSize}`);
  }
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addStudent(studentData: any): Observable<any> {
    return this.http.post(this.apiUrl, studentData);
  }

}

