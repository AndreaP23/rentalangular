import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthJwtService } from '../../core/services/auth-jwt.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userId: string | null = null;

  constructor(private authService: AuthJwtService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();  
    if (currentUser) {
      this.userId = currentUser.user_id;      
    } else {
      this.router.navigate(['/login']);
    }
  }
}
