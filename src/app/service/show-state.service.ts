import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowStateComponent } from '@dialog/show-state/show-state.component';

@Injectable({
  providedIn: 'root'
})
export class ShowStateService {
  State: string = '';

  constructor(private dialog: MatDialog) { }

  showState(state: string) {
    this.State = state;
    const dialogRef = this.dialog.open(ShowStateComponent);

    return dialogRef.afterClosed();
  }
}
