import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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
