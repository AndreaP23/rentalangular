// header.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthJwtService } from '../services/auth-jwt.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './header.component.html', 
  styleUrls: ['./header.component.css'] 
})
export class HeaderComponent {
  constructor(private authService: AuthJwtService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); 
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}
