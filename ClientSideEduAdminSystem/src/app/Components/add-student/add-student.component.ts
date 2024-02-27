import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStudent } from '../../Models/Interfaces/IStudent';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, ReactiveFormsModule], 
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent implements OnInit {

  selectedFileName: string = '';
  studentForm: FormGroup;


  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      studentID: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthCountry: ['', Validators.required],
      gender: ['', Validators.required],
      class: ['', Validators.required],
      questionnaireStatus: [''],
      personalPlanStatus: [''],
      studentStatus: ['', Validators.required],
      studentType: ['', Validators.required],
      previousIdentificationMessage: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      imagePath: [''],

    });
  }
    ngOnInit(): void {
      this.studentForm = new FormGroup({
        studentID: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        birthDate: new FormControl('', [Validators.required]),
        birthCountry: new FormControl('', [Validators.required]),
        gender: new FormControl('', [Validators.required]),
        class: new FormControl('', [Validators.required]),
        questionnaireStatus: new FormControl('', [Validators.required]),
        personalPlanStatus: new FormControl('', [Validators.required]),
        studentStatus: new FormControl('', [Validators.required]),
        studentType: new FormControl('', [Validators.required]),
        previousIdentificationMessage: new FormControl('', [Validators.required]),
        imagePath: new FormControl(''),
      })
    }
  

  onSubmit(): void {

    if (this.studentForm.valid) {
      this.studentService.addStudent(this.studentForm.value).subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          Swal.fire(
            'Added!',
            'The student has been added successfully.',
            'success'
          );
        },
        error: (error) => {
          console.error('Error adding student', error);
          Swal.fire(
            'Error!',
            'Failed to add the student.',
            'error'
          );
        }
      });
    }
  }

  // מדפיס לקונסול את מצב האימות של כל שדה  - מטודה לבדיקות
  checkFormValidity() {
    for (const field in this.studentForm.controls) {
      const control = this.studentForm.get(field);
      console.log(`${field} valid: ${control?.valid}, errors: ${JSON.stringify(control?.errors)}`);
    }
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFileName = file.name; 
    this.studentForm.controls['imagePath'].setValue(this.selectedFileName); 
  }

  cleanFileText() {
    this.selectedFileName = "";
    this.studentForm.controls['imagePath'].setValue(this.selectedFileName); 

  }
}
