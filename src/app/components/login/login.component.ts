import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { successMessage } from 'src/app/utils/helpers';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username : String = '';
  public password : String = '';

  constructor (private service : AuthService, private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const isLoggedOutParam = params.get('isLoggedOut');

      if (isLoggedOutParam && isLoggedOutParam === 'true') {
        successMessage('Cierre de sesión exitoso.');

        this.router.navigate(['/login']);
      }
    });
  }

  login() {
    if (this.username == '' || this.password == '') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Los campos son requeridos',
      });

      return;
    }

    const data = {
      'username': this.username,
      'password': this.password
    };

    this.service.login(data).subscribe(response => {
      if (response.code == 200) {
        localStorage.setItem('API_TOKEN', response.data.token);
        this.router.navigate(['/inicio', { isLoggedIn: true }]);
      }

      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: response.error,
      });
    });
  }
}
