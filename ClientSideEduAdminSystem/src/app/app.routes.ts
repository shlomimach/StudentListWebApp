import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { MenuComponent } from './Components/menu/menu.component';
import { AddStudentComponent } from './Components/add-student/add-student.component';

export const routes: Routes = [
  { path: 'app-menu', component: MenuComponent },
  { path: 'app-student-list', component: StudentListComponent },
  { path: 'app-add-student', component: AddStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule, ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

