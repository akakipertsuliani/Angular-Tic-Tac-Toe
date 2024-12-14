import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogClose } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    MatDialogClose,
  ],
  exports: [
    CommonModule,
    MatRadioModule,
    MatDialogClose,
    MatRippleModule,
    ReactiveFormsModule,
  ],
})
export class dialogModule {}
