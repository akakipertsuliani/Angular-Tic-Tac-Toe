import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-rooms-section',
  standalone: true,
  imports: [MatRippleModule],
  templateUrl: './rooms-section.component.html',
  styleUrl: './rooms-section.component.scss'
})
export class RoomsSectionComponent {

}
