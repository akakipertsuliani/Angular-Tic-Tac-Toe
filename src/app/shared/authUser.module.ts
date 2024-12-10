import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    MatRippleModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatRippleModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthUserModule {}
