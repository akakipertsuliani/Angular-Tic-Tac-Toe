import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@app/service/auth.service';
import { AuthUserModule } from '@app/shared/authUser.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [AuthUserModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  getErrors!: string;
  formGroup: FormGroup;
  successfulAuth: boolean = false;
  passwordVisibility: boolean = false;

  constructor(private auth: AuthService, private route: Router) {
    this.formGroup = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get errorHandler(): string {
    const usernameControl = this.formGroup.get('username');
    const emailControl = this.formGroup.get('email');
    const passwordControl = this.formGroup.get('password');

    if (usernameControl?.touched || usernameControl?.dirty) {
      if (usernameControl.errors?.['required']) {
        return 'Username is required';
      }
    }
    if (emailControl?.touched || emailControl?.dirty) {
      if (emailControl.errors?.['required']) {
        return 'Email is required';
      } else if (emailControl.errors?.['email']) {
        return 'Invalid email format';
      }
    }
    if (passwordControl?.touched || passwordControl?.dirty) {
      if (passwordControl.errors?.['required']) {
        return 'Password is required';
      } else if (passwordControl.errors?.['minlength']) {
        return 'Min length 6';
      }
    }

    if (this.getErrors === "auth/email-already-in-use") {
      return "Email already used";
    }

    return '';
  }

  signUpUser() {
    this.successfulAuth = true;
    if (this.formGroup.valid) {
      const userData = {
        username: this.formGroup.get('username')?.value,
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value,
      };

      this.auth.signUpUser(userData.username, userData.email, userData.password).then(() => {
        this.successfulAuth = false;
      }).catch(err => {
        this.successfulAuth = false;
        this.getErrors = err.code;
      });
    } else {
      this.successfulAuth = false;
      this.formGroup.markAllAsTouched();
    }
  }

  changePasswordVisibility() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
