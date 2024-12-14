import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Auth, authState } from '@angular/fire/auth';
import { filter, Observable, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { dialogModule } from '@app/shared/dialog.module';
import { getUserData } from '@app/interface/auth.interface';
import { FirestoreService } from '@app/service/firestore.service';
import { ShowStateService } from '@app/service/show-state.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowStateComponent } from '../show-state/show-state.component';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [dialogModule],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss',
})
export class JoinRoomComponent implements OnDestroy {
  authUser!: getUserData;
  joinRoomForm: FormGroup;
  subscription!: Subscription;
  user$: Observable<getUserData>;

  constructor(
    private auth: Auth,
    private dialog: MatDialog,
    private getState: ShowStateService,
    private firestore: FirestoreService,
    private dialogRef: MatDialogRef<JoinRoomComponent>,
  ) {
    this.user$ = authState(this.auth);
    this.joinRoomForm = new FormGroup({
      roomCode: new FormControl('', [
        Validators.required,
        Validators.minLength(28),
        Validators.maxLength(28),
      ]),
    });
  }

  ngOnInit(): void {
    this.subscription = this.user$.pipe(filter((user) => !!user)).subscribe({
      next: (user) => {
        this.authUser = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get errorHandler(): string {
    const roomName = this.joinRoomForm.get('roomCode');

    if (roomName?.touched || roomName?.dirty) {
      if (roomName.errors?.['required']) {
        return 'Room code is required';
      } else if (roomName.errors?.['minlength']) {
        return 'Room code must be at least 28 characters long';
      } else if (roomName.errors?.['maxlength']) {
        return 'Room code must be max 28 characters long';
      }
    }

    return '';
  }

  joinRoom() {
    if (this.joinRoomForm.valid) {
      const roomCode = this.joinRoomForm.get('roomCode')!.value;

      const roomData = {
        opponent: {
          uid: this.authUser.uid,
          name: this.authUser.displayName,
          move: false,
        },

        players: 2,
      };

      this.firestore.joinPrivateGameRoom(roomCode, roomData).then(() => {
        this.dialogRef.close();
        this.subscription = this.getState.showState("JoinSucc").subscribe({
          next: () => {
            location.reload();
          }
        });
      }).catch(() => {
        this.subscription = this.getState.showState("Error").subscribe();
      })
    } else {
      this.joinRoomForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
