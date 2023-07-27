import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      console.log('Datos del formulario:', userData);

      this.loginForm.reset();
      this.router.navigate(['/Home']);
    }
  }

  info(){
    Swal.fire({
      icon: 'info',
      title: 'No disponible',
      text: 'Esta funcionalidad aun no esta disponble',
      iconColor: '#38d39f',
    });
  }
}
