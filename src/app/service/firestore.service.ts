import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc, getDocs, setDoc } from '@angular/fire/firestore';
import { UserStats } from '@app/interface/auth.interface';
import { createRoomInter, joinRoomInter, publicGameRoomsData } from '@app/interface/game.interface';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  getUserDataFromRoom(uid: string) {
    const userDataRef = doc(this.firestore, `users/${uid}`);

    return from(getDoc(userDataRef)).pipe( 
      map((snapShot) => {
        if (snapShot.exists()) {
          return snapShot.data() as UserStats;
        }

      return { win: 0, lose: 0, draw: 0 };
    }));
  }

  getPublicGameRooms() {
    const gameRoomRef = collection(this.firestore, 'publicGameRooms');

    return from(getDocs(gameRoomRef)).pipe(
      map(snapShots => {
        return snapShots.docs.map(doc => (doc.data() as publicGameRoomsData))
      })
    );
  }

  createPublicGameRoom(uid: string, data: createRoomInter) {
    const gameRoomRef = doc(this.firestore, `publicGameRooms/${uid}`);
    
    return setDoc(gameRoomRef, { ...data })
  }

  createPrivateGameRoom(uid: string, data: createRoomInter) {
    const gameRoomRef = doc(this.firestore, `privateGameRooms/${uid}`);
    
    return setDoc(gameRoomRef, { ...data })
  }

  joinPublicGameRoom(roomCode: string, data: joinRoomInter) {
    const gameRoomRef = doc(this.firestore, `publicGameRooms/${roomCode}`);

    return setDoc(gameRoomRef, { ...data }, { merge: true });
  }

  joinPrivateGameRoom(roomCode: string, data: joinRoomInter) {
    const gameRoomRef = doc(this.firestore, `privateGameRooms/${roomCode}`);

    return setDoc(gameRoomRef, { ...data }, { merge: true });
  }
}
