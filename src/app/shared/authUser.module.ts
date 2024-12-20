import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    RouterLink,
  ],
  exports: [
    RouterLink,
    CommonModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthUserModule {}
