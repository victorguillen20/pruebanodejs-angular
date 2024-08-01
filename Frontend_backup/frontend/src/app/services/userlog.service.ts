import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserlogService {
  private userRole: string | null = null;
  private username: string | null = null;

  setRole(role: string) {
    this.userRole = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): string | null {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('userRole');
    }
    return this.userRole;
  }

  setUsername(username: string): void {
    this.username = username;
    localStorage.setItem('username', username);
  }

  getUsername(): string | null {
    if (!this.username) {
      this.username = localStorage.getItem('username');
    }
    return this.username;
  }


  isLoggedIn(): boolean {
    return this.userRole !== null;
  }
  clearUserInfo() {
    this.userRole = null;
    this.username = null;
  }
}

