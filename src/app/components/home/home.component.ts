import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { buildErrorMessage, successMessage } from 'src/app/utils/helpers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public message : string = '';
  public username : string = '';
  public name : string = '';
  public password : string = '';
  public passwordConfirm : string = '';
  public tokenData : any;

  constructor (
    private route: ActivatedRoute,
    private router : Router,
    private hService : HomeService,
    private uService : UserService,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const isLoggedInParam = params.get('isLoggedIn');

      if (isLoggedInParam && isLoggedInParam === 'true')
        successMessage('Inicio de sesión exitoso. ¡Bienvenido!');

    });

    this.router.navigate(['/inicio']);

    this.hService.index().subscribe(res => {
      this.message = res.data;
    });

    this.tokenData = this.jwtHelper.decodeToken();

    if (!this.tokenData) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al decodificar token'
      });
    }

    this.uService.getOne(this.tokenData.id).subscribe(res => {
      this.name = res.data.name;
      this.username = res.data.username;
    });
  }

  saveProfile() {
    if (this.username == '' || this.name == '') {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Nombre y nombre de usuario son requeridos',
      });

      return;
    }

    if (this.password != this.passwordConfirm) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Las contraseñas no coinciden',
      });

      return;
    }

    const data = (this.password != '') ? {
      'name': this.name,
      'username': this.username,
      'password': this.password
    } : {
      'name': this.name,
      'username': this.username
    };

    this.uService.update(this.tokenData.id, data).subscribe(res => {
      if (res.code != 200) {
        let errMessage : string = buildErrorMessage(res.error);

        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: errMessage
        });

        return;
      }

      successMessage('Perfil Actualizado correctamente');

      this.password = '';
      this.passwordConfirm = '';
    });
  }
}
