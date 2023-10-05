import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {
  public isLogedIn : Boolean = false;
  public isAdmin : Boolean;
  public logedAdmin : Boolean = false;

  constructor (private router : Router, private aService : AuthService) {
    this.isAdmin = this.aService.isAdmin();
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (localStorage.getItem('API_TOKEN'))
      this.isLogedIn = true;

    this.logedAdmin = (this.isLogedIn && this.isAdmin);
  }

  logout() {
    this.aService.logout().subscribe(res => {
      if (res.code == 200)
        localStorage.removeItem('API_TOKEN');

      this.router.navigate(['/login', { isLoggedOut: true }]);
    });
  }
}
