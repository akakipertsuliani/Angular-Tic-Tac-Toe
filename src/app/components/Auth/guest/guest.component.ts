import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '@app/service/auth.service';
import { AuthUserModule } from '@app/shared/authUser.module';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [AuthUserModule],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {
  formGroup: FormGroup;
  successfulAuth: boolean = false;

  constructor(private auth: AuthService, private route: Router) {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
    });
  }

  enterAsGuest() {
    this.successfulAuth = true;
    let username = this.formGroup.get('username')?.value;

    if (!username) {
      username = `Guest${Math.floor(1000000 + Math.random() * 9000000)}`;
    }

    const userData = { username };

    this.auth.enterAsGuest(userData.username).then(() => {
      this.successfulAuth = false;
    });
  }
}
