import { Component } from '@angular/core';
import { IStudent } from '../../Models/Interfaces/IStudent';
import { StudentService } from '../../Services/student.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule] 
})
export class StudentListComponent {
  students: IStudent[] = [];
  displayedStudents: IStudent[] = [];
  currentPage = 1;
  studentsPerPage = 10; // כמות התלמידים להצגה בעמוד
  totalPages!: number;
  sortColumn: string = '';
  sortDirection: string = '';
  searchTerm: string = ''; // ,תלמיד לחיפוש
  countStudentInPage: number = 0;
  selectedStudent: IStudent | undefined;

  constructor(private snackBar: MatSnackBar, private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  showStudentDetails(student: any) {
    this.selectedStudent = student;
  }

  //טעינת הנתונים שצריך בלבד - במקום הכל בפעם אחת Lazy Loading שימוש ב
  loadStudentsByPage(page: number) {
  this.currentPage = page;
    this.studentService.getStudentsPerPage(this.currentPage, this.studentsPerPage).subscribe({
      next: (data) => {
        this.displayedStudents = data;
        this.countStudentInPage = data.length;
      },
      error: (error) => {
        console.error('Failed to load students:', error);
      }
    });

  }
  deleteStudent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe({
          next: (response) => { 
            this.loadStudents();
            Swal.fire(
              'Deleted!',
              `The student with ID ${id} has been successfully deleted.`,
              'success'
            );
          },
          error: (error) => {
            console.error('Error deleting student:', error);
            Swal.fire(
              'Error!',
              'Failed to delete the student.',
              'error'
            );
          }
        });
      }
    });
  }



onNextPage() {
  this.loadStudentsByPage(this.currentPage + 1);
  this.searchTerm = "";
}

onPreviousPage() {
  this.loadStudentsByPage(this.currentPage - 1);
  this.searchTerm = "";

}
  loadStudents(): void {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        if (data && data.length > 0) {
          this.students = data;
          this.totalPages = Math.ceil(this.students.length / this.studentsPerPage);
          this.displayedStudents = this.students; 
          this.updateDisplayedStudents(); 


        }
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  updateDisplayedStudents(): void {
    const startIndex = (this.currentPage - 1) * this.studentsPerPage;
    const endIndex = startIndex + this.studentsPerPage;
    this.displayedStudents = this.students.slice(startIndex, endIndex);
    this.searchTerm = "";
    this.countStudentInPage = this.displayedStudents.length;

  }


  goToPage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedStudents();
  }
  goToFirstPage(): void {
    this.currentPage = 1;
    this.updateDisplayedStudents();
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.updateDisplayedStudents();
  }



  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.students.sort((a, b) => {
      let valueA = (a as any)[this.sortColumn];
      let valueB = (b as any)[this.sortColumn];

      if (this.sortDirection === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });

    this.updateDisplayedStudents();
  }

  filterStudents(): void {
    if (this.searchTerm.length >= 2) {
      this.studentService.getFilteredStudents(this.searchTerm).subscribe(data => {
        this.displayedStudents = data;
        this.countStudentInPage = data.length;

      });
    } else {
      // החיפוש קצר מ-2 אותיות? הצג את כל התלמידים - ייעול המערכת
      this.loadStudentsByPage(this.currentPage);
      this.countStudentInPage = this.displayedStudents.length;

    }
  }




}


