import { Auth, authState } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, Observable, Subscription } from 'rxjs';
import { dialogModule } from '@app/shared/dialog.module';
import { getUserData } from '@app/interface/auth.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '@app/service/firestore.service';
import { ShowStateService } from '@app/service/show-state.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ShowStateComponent } from '../show-state/show-state.component';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [dialogModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.scss'
})
export class CreateRoomComponent implements OnInit, OnDestroy {
  authUser!: getUserData;
  createRoomForm: FormGroup;
  subscription!: Subscription;
  user$: Observable<getUserData>;
  
  constructor(
    private auth: Auth, 
    private getState: ShowStateService,
    private firestore: FirestoreService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateRoomComponent>
  ) {
    this.user$ = authState(this.auth);
    this.createRoomForm = new FormGroup({
      roomName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      visibility: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.subscription = this.user$.pipe(
      filter(user => !!user),
    ).subscribe({
      next: (user) => {
        this.authUser = user;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  get errorHandler(): string {
    const roomName = this.createRoomForm.get('roomName');
    const visibility = this.createRoomForm.get('visibility');

    if (roomName?.touched || roomName?.dirty) {
      if (roomName.errors?.['required']) {
        return 'Room name is required';
      } else if (roomName.errors?.['minlength']) {
        return 'Room name must be at least 3 characters long';
      } else if (roomName.errors?.['maxlength']) {
        return 'Room name must be max 20 characters long';
      }
    }
    if (visibility?.touched || visibility?.dirty) {
      if (visibility.errors?.['required']) {
        return 'Please choose room visibility';
      }
    }

    return '';
  }

  createRoom() {
    if (this.createRoomForm.valid) {
      const roomName = this.createRoomForm.get('roomName')!.value;
      const visibility = this.createRoomForm.get('visibility')!.value;

      const roomData = {
        roomName: roomName,
        visibility: visibility,
        creator: {
          uid: this.authUser.uid,
          name: this.authUser.displayName,
          move: true,
        },
        players: 1,
        rules: JSON.stringify([[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]),
      };
      const createRoomPromise = visibility === '0'
        ? this.firestore.createPublicGameRoom(this.authUser.uid, roomData)
        : this.firestore.createPrivateGameRoom(this.authUser.uid, roomData);

      createRoomPromise.then(() => {
        this.dialogRef.close();
        this.subscription = this.getState.showState("CreateSucc").subscribe({
          next: () => {
            location.reload();
          }
        });
      }).catch(() => {
        this.subscription = this.getState.showState("SomethingWr").subscribe();
      });

    } else {
      this.createRoomForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
