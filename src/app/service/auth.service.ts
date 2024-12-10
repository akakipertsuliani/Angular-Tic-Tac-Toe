import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserAuthInter } from '@interface/auth.interface';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, authState, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}
  user$: Observable<any> = authState(Auth);

  private get getFormattedTime(): string {
    const currentDate = new Date();

    return currentDate.toLocaleString('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

  async signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUpUser(username: string, email: string, password: string) {
    const UserCredential = createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    const user = (await UserCredential).user;
    await updateProfile(user, { displayName: username });

    await setDoc(doc(this.firestore, `users/${user.uid}`), <UserAuthInter>{
      time: this.getFormattedTime,
      win: 0,
      lose: 0,
      draw: 0,
    });
  }

  async enterAsGuest(username: string) {
    const userCredential = await signInAnonymously(this.auth);
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });
    await setDoc(doc(this.firestore, `guest/${user.uid}`), {
      username,
      time: this.getFormattedTime,
    });
  }

  signOut() {
    return this.auth.signOut();
  }
}
