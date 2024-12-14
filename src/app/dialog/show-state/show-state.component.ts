import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogClose } from '@angular/material/dialog';
import { ShowStateService } from '@app/service/show-state.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-show-state',
  standalone: true,
  imports: [CommonModule, MatDialogClose, MatRippleModule],
  templateUrl: './show-state.component.html',
  styleUrl: './show-state.component.scss'
})
export class ShowStateComponent {
  showState: string = '';

  constructor(private getState: ShowStateService) {
    this.showState = this.getState.State;
  }
}
