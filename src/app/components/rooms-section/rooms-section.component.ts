import { filter, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@app/service/auth.service';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirestoreService } from '@app/service/firestore.service';
import { publicGameRoomsData } from '@app/interface/game.interface';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { JoinRoomComponent } from '@app/dialog/join-room/join-room.component';
import { CreateRoomComponent } from '@dialog/create-room/create-room.component';
import { ShowStateService } from '@app/service/show-state.service';

@Component({
  selector: 'app-rooms-section',
  standalone: true,
  imports: [MatRippleModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './rooms-section.component.html',
  styleUrl: './rooms-section.component.scss'
})
export class RoomsSectionComponent implements OnInit, OnDestroy {
  roomData!: publicGameRoomsData[];
  subscription!: Subscription;

  constructor(
    private auth: AuthService,
    private dialog: MatDialog,
    private Firestore: Firestore,
    private getState: ShowStateService,
    private firestore: FirestoreService, 
  ) {}

  ngOnInit(): void {
    this.subscription = this.firestore.getPublicGameRooms().pipe(
      filter(roomData => !!roomData)
    ).subscribe({
      next: (roomData) => {
        this.roomData = roomData;
        const gameRoomRef = collection(this.Firestore, 'publicGameRooms');
        
        onSnapshot(gameRoomRef, (snapShot) => {
          this.roomData = snapShot.docs.map(doc => (doc.data() as publicGameRoomsData));
        })
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  openCreateRoomDialog() {
    this.dialog.open(CreateRoomComponent);
  }

  openJoinRoomDialog() {
    this.dialog.open(JoinRoomComponent);
  }

  joinRoomFromHome(roomCode: string) {
    const roomData = {
      opponent: {
        uid: this.auth.authUser.uid,
        name: this.auth.authUser.displayName,
        move: false,
      },

      players: 2
    };

    this.firestore.joinPublicGameRoom(roomCode, roomData).then(() => {
      this.subscription = this.getState.showState("JoinSucc").subscribe({
        next: () => {
          location.reload();
        }
      })
    }).catch(() => {
      this.subscription = this.getState.showState("Error").subscribe()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
