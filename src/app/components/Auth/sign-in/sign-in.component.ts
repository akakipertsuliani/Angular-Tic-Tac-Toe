import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '@app/service/auth.service';
import { AuthUserModule } from '@app/shared/authUser.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [AuthUserModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  getErrors!: string;
  formGroup: FormGroup;
  successfulAuth: boolean = false;
  passwordVisibility: boolean = false;
  
  constructor(private auth: AuthService, private route: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get errorHandler(): string {
    const emailControl = this.formGroup.get('email');
    const passwordControl = this.formGroup.get('password');

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
      } if (passwordControl.errors?.['minlength']) {
        return 'Password must be at least 6 characters long';
      }
    }

    if (this.getErrors === "auth/invalid-credential") {
      return "Email or Password is incorrect";
    }

    return '';
  }
  
  signUpUser() {
    this.successfulAuth = true;
    if (this.formGroup.valid) {
      const userData = {
        email: this.formGroup.get('email')?.value,
        password: this.formGroup.get('password')?.value,
      };

      this.auth.signInUser(userData.email, userData.password).then(() => {
        this.route.navigate(['/home']);
        this.successfulAuth = false;
      }).catch((err) => {
        this.getErrors = err.code;
        this.successfulAuth = false;
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
