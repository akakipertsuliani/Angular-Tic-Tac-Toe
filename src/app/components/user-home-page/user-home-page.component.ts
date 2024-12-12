import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AuthService } from '@app/service/auth.service';
import { MatRippleModule } from '@angular/material/core';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FirestoreService } from '@app/service/firestore.service';
import { getUserData, UserStats } from '@app/interface/auth.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoomsSectionComponent } from '../rooms-section/rooms-section.component';

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [
    CommonModule, 
    MatRippleModule, 
    HeaderComponent, 
    RoomsSectionComponent, 
    MatProgressSpinnerModule
  ],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.scss'
})
export class UserHomePageComponent implements OnInit {
  username: string = '';
  userStats!: UserStats;
  loader: boolean = false;
  user$: Observable<getUserData>;

  constructor(
    private auth: AuthService, 
    private firestore: FirestoreService, 
    private Auth: Auth, 
    private router: Router
  ) {
    this.user$ = authState(this.Auth);
  }

  ngOnInit(): void {
    this.user$.pipe(
      filter(user => !!user),
      tap(user => this.username = user.displayName),
      switchMap(userStats => this.firestore.getUserDataFromRoom(userStats.uid))
    ).subscribe({
      next: (userStats) => {
        this.userStats = userStats;
      },
    })
  }

  signOut() {
    this.loader = true;
    this.auth.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    })
  }
}
