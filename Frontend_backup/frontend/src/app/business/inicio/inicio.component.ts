import { Component, inject, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ResponseProfile } from '../../interface/ResponseProfile';
import { UserlogService } from '../../services/userlog.service';
import { AuthService } from '../../services/auth.service';
import { Profile } from '../../models/Profile';
import { TurnService } from '../../services/turn.service';
import { ResponseTotalTurn } from '../../interface/ResponseTotalTurn';
import { UserService } from '../../services/user.service';
import { GetidbyUser } from '../../models/GetidbyUser';
import { ResponseGetidbyUser } from '../../interface/ResponseGetidbyUser';
import { PeticionTurn } from '../../models/PeticionTurn';
import { GetUserUnaproval } from '../../models/GetUserUnaproval';
import { ResponseGetUserUnaproval } from '../../interface/ResponseGetUserUnaproval';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, MatPaginator, MatInputModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class InicioComponent implements OnInit {
  private userlog = inject(UserlogService);
  private authService = inject(AuthService);
  private turnService = inject(TurnService);
  private userService = inject(UserService);
  public userRole: string | string | null = null;


  public dataSource = new MatTableDataSource<ResponseProfile>();
  public dataSourceUsers = new MatTableDataSource<ResponseGetUserUnaproval>();

  public displayedColumns: string[] = ['username', 'email', 'rolname', 'userstatus_description'];
  public displayedColumnsUsers: string[] = ['username', 'email', 'creationdate'];
  public isLoadingProfile = true;
  public isLoadingUsers = true;

  totalTurnsAdmin: string = '0';
  totalTurnsGestor: string = '0';
  userid: string = '';

  ngOnInit(): void {
    this.userRole = this.userlog.getRole();
    const username = this.userlog.getUsername();
    console.log('Fetched username:', username);

    if (username) {
      this.fetchProfile(username);
      this.fetchUserIdAndTurns(username);
      console.log('Este es el this.userid');
      // this.getUsersUnAproval(this.userid);
    } else {
      console.error('Username is null');
      this.isLoadingProfile = false;
    }
    this.turnService.getTotalTurns().subscribe((data: ResponseTotalTurn) => {
      this.totalTurnsAdmin = data.total;
    });
  }

  fetchUserIdAndTurns(username: string): void {
    const getUserIdRequest: GetidbyUser = { username: username };
    this.userService.getId(getUserIdRequest).subscribe({
      next: (response: ResponseGetidbyUser) => {
        this.userid = response.userid;
        console.log('User ID:', response.userid);
        this.getTurnsByGestor(this.userid);
        this.getUsersUnAproval(this.userid);
      },
      error: (error) => {
        console.error('Error fetching user ID:', error);
      }
    });
  }

  getTurnsByGestor(userid: string): void {
    const request: PeticionTurn = { usergestorid: userid };
    this.turnService.getTotalTurnsbyGestor(request).subscribe((data: ResponseTotalTurn) => {
      this.totalTurnsGestor = data.total;
    });
  }

  fetchProfile(username: string): void {
    const profileRequest: Profile = { username: username };
    this.authService.profile(profileRequest).subscribe({
      next: (data) => {
        this.dataSource.data = [data];
        this.isLoadingProfile = false;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.isLoadingProfile = false;
      }
    });
  }

  getUsersUnAproval(usercreate: string): void {
    const getUsersRequest: GetUserUnaproval = { usercreate: usercreate};
    this.userService.getUsersUaproval(getUsersRequest).subscribe({
      next: (data) => {
        this.dataSourceUsers.data = data;
        this.isLoadingUsers = false;
      },
      error: (error) => {
        console.error('Error fetching UserUnAproval:', error);
        this.isLoadingUsers = false;
      }
    });
  }
}
