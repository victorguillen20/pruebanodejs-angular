import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserlogService } from '../../services/userlog.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  private userlog = inject(UserlogService);
  private router = inject(Router);
  public userRole: string | string | null = null;


  ngOnInit(): void {
    this.userRole = this.userlog.getRole();
    console.log('Rol del usuario:', this.userRole);
  }

  logout(): void {
    this.userlog.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
