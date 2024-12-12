import { Injectable } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { UserStats } from '@app/interface/auth.interface';
import { from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

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
}
