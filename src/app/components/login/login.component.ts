import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  showError = false; // Variable para controlar si se muestra el mensaje de error

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

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

      this.loginService.getUserById(userData.username).subscribe(
        (user: any) => {
          if (user.password === userData.password) {
            this.loginService.saveUserToSessionStorage(user);
            this.showError = false;
            this.loginForm.reset();
            this.router.navigate(['/Home']);
          }else{
            this.showError = true;
          }
        },
        (error) => {
          console.error('Error al autenticar usuario:', error);
          if (error.status) {
            this.showError = true;
          } else {
          }
        }
      );
    }
  }

  info() {
    Swal.fire({
      icon: 'info',
      title: 'No disponible',
      text: 'Esta funcionalidad aún no está disponible',
      iconColor: '#38d39f',
    });
  }
}
